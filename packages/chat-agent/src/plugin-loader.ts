import { ChatManager, PluginModule } from "@syncsky/chat-api"
import { PluginExtension } from "@syncsky/chat-api/src/plugin/plugin-extension";

export async function loadModule(chat: ChatManager, { platform, register }: PluginModule) {
    console.log("loading module:", platform);
    const stime = performance.now();
    const chatModule = chat.moduleManager.createModule({ platform });
    await register(chatModule);
    const dtime = performance.now() - stime;
    console.log("module loaded: %s (%f ms)", platform, Math.ceil(dtime));
}

export async function loadExtension(chat: ChatManager, { name, register }: PluginExtension) {
    console.log("loading extension:", name);
    const stime = performance.now();
    const chatExtension = chat.extensionManager.createExtension();
    await register(chatExtension);
    const dtime = performance.now() - stime;
    console.log("extension loaded: %s (%f ms)", name, Math.ceil(dtime));
}
