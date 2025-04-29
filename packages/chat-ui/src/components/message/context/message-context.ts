import { ChatEmoteSegment, ChatMessage } from "@syncsky/chat-api";
import React from "react";

export interface ChatMessageExtended extends ChatMessage {
    platformBadge?: React.JSX.Element;
    extra: {
        gigantic?: ChatEmoteSegment
    }
}

export const messageContext = React.createContext<ChatMessageExtended | undefined>(undefined);

export function useMessageContext() {
    const context = React.useContext(messageContext);
    if (context == undefined) {
        throw new Error("Missing MessageContextProvider");
    }

    return context;
}
