import { EventEmitter } from "eventemitter3"
import { ChatModuleManager } from "./module/chat-module-manager";
import { ChatExtensionManager } from "./extension/chat-extension-manager";
import { ChatBaseEvent } from "./dto/event-base";

interface ChatManagerEvents {
    stop: [];
    resume: [];
    disconnect: [];
    onEvent: [event: ChatBaseEvent];
}

export class ChatManager extends EventEmitter<ChatManagerEvents> {
    public readonly moduleManager = new ChatModuleManager(this);
    public readonly extensionManager = new ChatExtensionManager(this);

    constructor() {
        super();
    }

    public disconnect() {
        this.emit("disconnect");
    }

    public stop() {
        this.emit("stop");
    }

    public resume() {
        this.emit("resume");
    }

    public async pushEvent(event: ChatBaseEvent) {
        await this.extensionManager.processEvent(event);
        this.emit("onEvent", event);
    }
}
