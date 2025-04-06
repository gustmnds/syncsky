import { EventEmitter } from "eventemitter3"
import { ChatMessage } from "./dto/chat-message";
import { ChatModuleManager } from "./module/chat-module-manager";
import { ChatExtensionManager } from "./extension/chat-extension-manager";

interface ChatManagerEvents {
    stop: [];
    resume: [];
    disconnect: [];
    onSeedChange: [seed: number];
    onMessage: [message: ChatMessage];
    onDeleteMessage: [filter: ChatMessageFilter];
}

export interface ChatMessageFilter {
    authorId?: string;
    platform?: string;
    messageId?: string;
}

export type ChatManagerSettings = {
    maxMessages: number;
}

export class ChatManager extends EventEmitter<ChatManagerEvents> {
    public readonly moduleManager = new ChatModuleManager(this);
    public readonly extensionManager = new ChatExtensionManager();

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

    public async pushMessage(message: ChatMessage) {
        await this.extensionManager.processMessage(message);
        this.emit("onMessage", message);
    }

    public deleteMessages(selector: ChatMessageFilter) {
        this.emit("onDeleteMessage", selector);
    }
}
