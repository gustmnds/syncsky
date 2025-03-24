import EventEmitter from "eventemitter3";
import { ChatManager } from "../chat-manager";
import { ChatMessage } from "../dto/chat-message";

interface ChatModuleEvents {
    disconnect: [];
}

export class ChatModule extends EventEmitter<ChatModuleEvents> {
    constructor(
        public readonly platform: string,
        private readonly manager: ChatManager
    ) {
        super();
    }
    
    public addMessage(message: Omit<ChatMessage, "platform">) {
        this.manager.pushMessage({...message, platform: this.platform });
    }

    public removeMessageById(messageId: string) {
        this.manager.deleteMessages({
            messageId,
            platform: this.platform
        })
    }

    public removeMessagesByAuthorId(authorId: string) {
        this.manager.deleteMessages({
            authorId,
            platform: this.platform
        })
    }

    public removeAllMessages() {
        this.manager.deleteMessages({
            platform: this.platform
        })
    }
}
