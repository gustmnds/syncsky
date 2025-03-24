import EventEmitter from "eventemitter3";

export class BTTVSocket extends EventEmitter {
    private ws?: WebSocket;

    public connect() {
        if (this.ws) return;
        this.ws = new WebSocket("wss://sockets.betterttv.net/ws");
        this.ws.onmessage = this.handleMessage.bind(this);
    }

    private handleMessage(message: MessageEvent) {
        console.log(message);
        console.log(message.data);
    }
}
