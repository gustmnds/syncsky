import { ChatModule } from "../module/chat-module";

export interface PluginModule {
    platform: string;
    register: (chatModule: ChatModule) => Promise<void>;
};

export type PluginModuleHandler = (module: PluginModule) => Promise<void>;
