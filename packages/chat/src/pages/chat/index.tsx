import { ChatLayout } from "./chat.page";
import { ChatContextProvider } from "@/context/chat/chat-contenxt-provider";

export function ChatPage() {
    return (
        <ChatContextProvider>
            <ChatLayout/>
        </ChatContextProvider>
    )
}
