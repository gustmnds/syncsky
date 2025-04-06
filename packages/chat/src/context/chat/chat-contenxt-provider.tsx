import { ChatMessage, ChatMessageFilter } from "@syncsky/chat-api";
import { useEffect, useMemo, useState } from "react"
import { ChatContext } from "./use-chat-context";
import { io } from "socket.io-client";
import { appendItem } from "@/utils/array";

type ChatContextProviderProps = {
    children: React.ReactNode;
}

export function ChatContextProvider(props: ChatContextProviderProps) {
    const socket = useMemo(() => io("ws://127.0.0.1:58325"), []);
    const [messages, setMessages] = useState(Array<ChatMessage>());

    useEffect(() => {
        socket.on("message", (message: ChatMessage) => {
            setMessages((messages) => appendItem(messages, message, 10))
        });

        socket.on("delete", (filter: ChatMessageFilter) => {
            setMessages((messages) => messages.filter(
                (message) => {
                    if (filter.authorId && message.author.authorId !== filter.authorId) {
                        return true;
                    }

                    if (filter.messageId && message.messageId !== filter.messageId) {
                        return true;
                    }

                    if (filter.platform && message.platform !== filter.platform) {
                        return true;
                    }

                    return false;
                }
            ))
        })

        return () => void socket.disconnect();
    }, [socket]);

    return (
        <ChatContext.Provider value={messages}>
            {props.children}
        </ChatContext.Provider>
    )
}
