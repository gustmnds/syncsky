import { ChatManager } from "../chat-manager";
import { ChatModule } from "./chat-module";

interface ChatModuleProps {
    platform: string;
}

export class ChatModuleManager {
    private readonly chatModules: Record<string, ChatModule> = {};

    constructor(private readonly manager: ChatManager) {
        this.manager.on("disconnect", () => this.emitEvent("disconnect"));
        this.manager.on("stop", () => this.emitEvent("stop"));
        this.manager.on("resume", () => this.emitEvent("resume"));
    }

    private emitEvent(event: "stop" | "resume" | "disconnect") {
        for (const moduleName in this.chatModules) {
            this.chatModules[moduleName].emit(event);
            if (event == "disconnect") {
                delete this.chatModules[moduleName];
            }
        }
    }

    public createModule(settings: ChatModuleProps) {
        if (settings.platform in this.chatModules) {
            throw new Error(`Module with platform '${settings.platform}' already registered`);
        }

        const chatModule = new ChatModule(settings.platform, this.manager);
        this.chatModules[settings.platform] = chatModule;
        return chatModule;
    }
}
