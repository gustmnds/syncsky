import { BTTVChatExtension } from "@syncsky/bttv-chat-extension"
import { ChatManager } from "@syncsky/chat-api";
import { TwitchChatModule } from "@syncsky/twitch-chat-module";
import { useEffect, useState } from "react";
import "@/styles/global.css";
import { Message } from "./components/message/message.component";

const chat = new ChatManager({ maxMessages: 10 });
chat.extensionManager.register(new BTTVChatExtension());
TwitchChatModule.register(chat.moduleManager, {
    clientId: import.meta.env.VITE_TWITCH_CLIENT_ID,
    accessToken: import.meta.env.VITE_TWITCH_ACCESS_TOKEN,
    channel: import.meta.env.VITE_TWITCH_CHANNEL
});

export function App() {
    const [, setSeed] = useState(0);

    useEffect(() => {
        chat.on("onSeedChange", seed => setSeed(seed));
    }, []);

    return (
        <div style={{
                height: "500px",
                width: "400px",
                border: "1px solid white",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                backgroundColor: "#12121A"
            }}>
            {chat.messages.map(message => (
                <Message key={message.messageId} message={message}/>
            ))}
        </div>
    )
}
