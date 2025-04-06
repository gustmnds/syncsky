import { ChatManager } from "@syncsky/chat-api";
import { Server, Socket } from "socket.io";

export class ServerManager {
    private stopped: boolean = true;
    private connectionCount: number = 0;
    private readonly server = new Server({
        cors: { origin: process.env.SERVER_CORS! }
    });
    
    public readonly chatManager = new ChatManager();

    constructor() {
        this.server.on("connection", this.onConnection.bind(this));
        this.chatManager.on("onMessage", this.server.emit.bind(this.server, "message"));
        this.chatManager.on("onDeleteMessage", this.server.emit.bind(this.server, "delete"));
    }

    public listen() {
        this.server.listen(58325);
    }

    private onDisconnect() {
        this.connectionCount--;
        this.checkState();
    }

    private onConnection(socket: Socket) {
        this.connectionCount++;
        socket.on("disconnect", this.onDisconnect.bind(this));
        this.checkState();
    }

    private checkState() {
        if (this.connectionCount > 0 && this.stopped) {
            this.stopped = false;
            this.chatManager.resume();
        } else if (this.connectionCount == 0 && !this.stopped) {
            this.stopped = true;
            this.chatManager.stop();
        }
    }
}
