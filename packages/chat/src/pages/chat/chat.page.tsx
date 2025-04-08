import { Message } from "@/components/message2/message-component";
import { useChatContext } from "@/context/chat/use-chat-context";

export function ChatLayout() {
    const messages = useChatContext();

    Object.assign(window, {"__chat_messages__": messages});

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
