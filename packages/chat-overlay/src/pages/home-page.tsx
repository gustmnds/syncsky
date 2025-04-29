import { useOverlayContext } from "@/context/overlay";
import { DashboardPage } from "./dashboard/dashboard";
import { ChatPage } from "./chat-page";
import { ChatContextProvider } from "@/context/chat";

export function HomePage() {
    const { streamerMode } = useOverlayContext();

    if (streamerMode) {
        return <DashboardPage/>;
    }

    return (
        <ChatContextProvider>
            <ChatPage/>
        </ChatContextProvider>
    );
}
