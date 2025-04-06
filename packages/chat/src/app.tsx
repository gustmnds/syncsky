import "@/styles/global.css";
import { ChatContextProvider } from "./context/chat/chat-contenxt-provider";
import { ChatPage } from "./pages/chat/chat.page";

export function App() {
    return (
        <ChatContextProvider>
            <ChatPage/>
        </ChatContextProvider>
    )
}
