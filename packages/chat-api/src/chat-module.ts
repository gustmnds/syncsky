import { ChatManager } from "./chat-manager";
import { ChatMessage } from "./dto/chat-message";

export class ChatModule {
    constructor(
        public readonly platform: string,
        private readonly manager: ChatManager
    ) {}
    
    public addMessage(message: ChatMessage) {
        this.manager.pushMessage(message, this.platform);
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
