import { Message, PlatformBadge } from "@syncsky/chat-ui"
import { useChatContext } from '@/context/chat/use-chat-context';
import { useOverlayContext } from "@/context/overlay/use-overlay-context";

export function ChatPage() {
    const { messages } = useChatContext();
    const { streamerMode } = useOverlayContext();

    return (
        <div data-streamer-mode={streamerMode} className="chat-container" style={{
            display: "flex",
            flex: 1,
            flexDirection: "column-reverse",
            gap: "0.5rem",
            width: "100%",
            height: "100%"
        }}>
            {messages.map((message, idx) => (
                <Message
                    key={idx}
                    message={message}
                    platformBadge={
                        <PlatformBadge
                            platform={message.platform}
                            className="badge"
                        />
                    }
                />
            ))}
        </div>
    )
}
