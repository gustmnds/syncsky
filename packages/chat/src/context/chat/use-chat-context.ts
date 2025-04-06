import { ChatMessage } from "@syncsky/chat-api";
import React from "react";

export const ChatContext = React.createContext<ChatMessage[] | undefined>(undefined);

export function useChatContext() {
    const context = React.useContext(ChatContext);
    if (!context) {
        throw new Error("Missing ChatContextProvider");
    }

    return context;
}
