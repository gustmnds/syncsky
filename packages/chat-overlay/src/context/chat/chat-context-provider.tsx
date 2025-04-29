import React, { useCallback, useEffect, useState } from "react";
import { ChatContext } from "./use-chat-context";
import { ChatMessage, ChatMessageEvent, ChatMessageFilterEvent } from "@syncsky/chat-api";
import { prependItem } from "@/utils/array";
import { useAgentContext } from "@/context/agent";
import { MessageFilterMatch } from "./utils/message-filter";

export interface ChatContextProviderProps {
    children: React.ReactNode;
    maxMessages?: number
}

export function ChatContextProvider({ children, maxMessages = 50 }: ChatContextProviderProps) {
    const [messages, setMessages] = useState(Array<ChatMessage>());
    const { socket } = useAgentContext();

    const handleMessage = useCallback(({ value }: ChatMessageEvent) => {
        setMessages(function(messages) {
            return prependItem(messages, value, maxMessages)
        });
    }, [maxMessages]);

    const handleFilter = useCallback((event: ChatMessageFilterEvent) => {
        setMessages(function(messages) {
            return messages.filter((message) => {
                return !MessageFilterMatch(message, event);
            });
        });
    }, []);

    useEffect(() => {
        socket.on("CHAT_MESSAGE", handleMessage);
        socket.on("CHAT_MESSAGE_FILTER", handleFilter);

        return () => {
            socket.off("CHAT_MESSAGE", handleMessage);
            socket.off("CHAT_MESSAGE_FILTER", handleFilter);
        }
    }, [socket, handleMessage, handleFilter]);

    return (
        <ChatContext.Provider value={{ messages }}>
            {children}
        </ChatContext.Provider>
    )
}
