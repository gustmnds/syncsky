import { Message } from "@/components/message/message.component";
import { useChatContext } from "@/context/chat/use-chat-context";

export function ChatPage() {
    const messages = useChatContext();

    return (
        <div style={{
                height: "500px",
                width: "400px",
                border: "1px solid white",
                padding: "1rem",
                display: "flex",
                flexDirection: "column-reverse",
                gap: "0.5rem",
                backgroundColor: "#12121A",
                overflow: "hidden"
            }}>
            {messages.slice().reverse().map(message => (
                <Message key={message.messageId} message={message}/>
            ))}
        </div>
    )
}
