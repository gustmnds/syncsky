import { EventEmitter } from "eventemitter3"
import { ChatMessage } from "./dto/chat-message";
import { ChatModuleManager } from "./chat-module-manager";
import { ChatModule } from "./chat-module";

interface ChatManagerEvents {
    onMessage: [key: string, value: string];
    onSeedChange: [seed: number];
}

export interface ChatPlatformMessage extends ChatMessage {
    platform: string;
}

export interface ChatMessageFilter extends Partial<
    Pick<
        ChatPlatformMessage,
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
    public messages: ChatPlatformMessage[] = [];
    public readonly moduleManager = new ChatModuleManager(this);

    constructor(private readonly settings: ChatManagerSettings) {
        super();
    }

    public pushMessage(message: ChatMessage, platform: string) {
        this.messages.push({ ...message, platform });
        this.messages.splice(0, this.messages.length - this.settings.maxMessages);
        this.seed++;
        this.emit("onSeedChange", this.seed);
    }

    public deleteMessages(selector: ChatMessageFilter) {
        this.messages = this.messages.filter((message) => !this.filterMatch(message, selector));
        this.seed++;
        this.emit("onSeedChange", this.seed);
    }

    private filterMatch(message: ChatPlatformMessage, filter: ChatMessageFilter) {
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


/*


moduleManager

manager.createModule(platform: name) = 




*/
