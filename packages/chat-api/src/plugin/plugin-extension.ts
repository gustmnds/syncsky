import { ChatExtension } from "../extension/chat-extension";

export interface PluginExtension {
    name: string;
    register: (chatExtension: ChatExtension) => Promise<void>;
};

export type PluginExtensionHandler = (module: PluginExtension) => Promise<void>;
