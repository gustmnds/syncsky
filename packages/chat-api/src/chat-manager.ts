import { EventEmitter } from "eventemitter3"
import { ChatMessage } from "./dto/chat-message";
import { ChatModuleManager } from "./module/chat-module-manager";
import { ChatExtensionManager } from "./extension/chat-extension-manager";

interface ChatManagerEvents {
    onSeedChange: [seed: number];
    disconnect: [];
}

export interface ChatMessageFilter extends Partial<
    Pick<
        ChatMessage,
        | "platform"
        | "messageId"
        | "authorId"
    >
> {}

export type ChatManagerSettings = {
    maxMessages: number;
}

export class ChatManager extends EventEmitter<ChatManagerEvents> {
    public seed: number = 0;
    public messages: ChatMessage[] = [];
    public readonly moduleManager = new ChatModuleManager(this);
    public readonly extensionManager = new ChatExtensionManager();

    constructor(private readonly settings: ChatManagerSettings) {
        super();
    }

    public disconnect() {
        this.emit("disconnect");
    }

    public async pushMessage(message: ChatMessage) {
        await this.extensionManager.processMessage(message);
        this.messages.push({ ...message });
        this.messages.splice(0, this.messages.length - this.settings.maxMessages);
        this.seed++;
        this.emit("onSeedChange", this.seed);
    }

    public deleteMessages(selector: ChatMessageFilter) {
        this.messages = this.messages.filter((message) => !this.filterMatch(message, selector));
        this.seed++;
        this.emit("onSeedChange", this.seed);
    }

    private filterMatch(message: ChatMessage, filter: ChatMessageFilter) {
        if (filter.platform && filter.platform !== message.platform) {
            return false;
        }

        if (filter.authorId && filter.authorId !== message.authorId) {
            return false;
        }

        if (filter.messageId && filter.messageId !== message.messageId) {
            return false;
        }

        return true;
    }
}
