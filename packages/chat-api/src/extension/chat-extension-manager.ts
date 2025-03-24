import { ChatManager } from "../chat-manager";
import { ChatMessage } from "../dto/chat-message";
import { ChatExtension } from "./chat-extension";

export class ChatExtensionManager {
    private readonly extensions: ChatExtension[] = [];
    public register(extension: ChatExtension) {
        extension.initialize().then(() => this.extensions.push(extension))
    }

    public async processMessage(message: ChatMessage) {
        for (const extension of this.extensions) {
            await extension.onMessage(message);
        }
    }
}
