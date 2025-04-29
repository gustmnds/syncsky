import { ChatManager } from "../chat-manager";
import { ChatBaseEvent } from "../dto";
import { ChatExtension } from "./chat-extension";

export class ChatExtensionManager {
    private readonly extensions: ChatExtension[] = [];

    constructor(private readonly manager: ChatManager) {}

    public async processEvent(message: ChatBaseEvent) {
        for (const extension of this.extensions) {
            await extension.processEvent(message);
        }
    }

    public createExtension() {
        const chatExtension = new ChatExtension(this.manager);
        this.extensions.push(chatExtension);
        return chatExtension;
    }
}
