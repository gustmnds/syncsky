import { ChatManager, PluginModule } from "@syncsky/chat-api"

export async function loadPlugin(chat: ChatManager, { platform, register }: PluginModule) {
    console.log("loading plugin", platform);
    const stime = performance.now();
    const chatModule = chat.moduleManager.createModule({ platform });
    await register(chatModule);
    const dtime = performance.now() - stime;
    console.log("plugin loaded: %s (%f ms)", platform, Math.ceil(dtime));
}
