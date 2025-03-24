import { ChatMessage } from "../dto/chat-message";

export class ChatExtension {
    async onMessage(message: ChatMessage): Promise<void> {}
    async initialize(): Promise<void> {}
}
