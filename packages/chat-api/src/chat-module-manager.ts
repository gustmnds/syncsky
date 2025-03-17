import { ChatManager } from "./chat-manager";
import { ChatModule } from "./chat-module";
import { ChatMessage } from "./dto/chat-message";

interface ChatModuleProps {
    platform: string;
}

export class ChatModuleManager {
    private readonly chatModules: Record<string, ChatModule> = {};

    constructor(private readonly manager: ChatManager) {}

    public createModule(settings: ChatModuleProps) {
        if (settings.platform in this.chatModules) {
            throw new Error(`Module with platform '${settings.platform}' already registered`);
        }

        const chatModule = new ChatModule(settings.platform, this.manager);
        this.chatModules[settings.platform] = chatModule;
        return chatModule;
    }
}
