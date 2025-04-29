import { ChatMessage } from "@syncsky/chat-api";
import React from "react";

export interface ChatContextData {
    messages: ChatMessage[];
}

export const ChatContext = React.createContext<ChatContextData | undefined>(undefined);

export function useChatContext() {
    const context = React.useContext(ChatContext);
    if (context == undefined) {
        throw new Error("Missing ChatContextProvider");
    }

    return context;
}
