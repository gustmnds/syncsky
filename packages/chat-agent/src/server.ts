import { ChatBaseEvent, ChatManager } from "@syncsky/chat-api";
import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http"
import { LOCAL_URL, ORIGINS } from "./settings";

export class ServerManager {
    private stopped: boolean = true;
    private connectionCount: number = 0;
    private server: Server;
    
    public readonly chatManager = new ChatManager();

    constructor(server: HTTPServer) {
        this.server = new Server(server, {
            cors: { origin: ORIGINS }
        });
        this.server.on("connection", this.onConnection.bind(this));
        this.chatManager.on("onEvent", this.handleEvent.bind(this));
    }

    private handleEvent(event: ChatBaseEvent) {
        this.server.emit(event.event, event);
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
        if (socket.request.headers.origin == LOCAL_URL) {
            socket.send("streamer");
            //socket.on("event", this.handleEvent);
        }
        this.checkState();
    }

    private checkState() {
        if (this.connectionCount > 0 && this.stopped) {
            this.stopped = false;
            this.chatManager.resume();
            console.log("resume");
        } else if (this.connectionCount == 0 && !this.stopped) {
            this.stopped = true;
            this.chatManager.stop();
            console.log("stop");
        }
    }
}
