import React, { useMemo } from "react";
import { ChatMessage, ChatMessageModifier, ChatSegmentType } from "@syncsky/chat-api";
import { ChatMessageExtended, messageContext } from "./message-context";

export interface MessageContextProviderProps {
    message: ChatMessage;
    platformBadge?: React.JSX.Element;
    children: React.ReactNode;
}

export function MessageContextProvider({ children, message, platformBadge }: MessageContextProviderProps) {
    const messageData = useMemo(() => {
        const data: ChatMessageExtended = {
            ...message,
            platformBadge,
            segments: message.segments.slice(),
            extra: {}
        };

        if (data.modifiers.includes(ChatMessageModifier.GIGANTIC_EMOTE)) {
            const lastSegment = data.segments[data.segments.length - 1];
            if (typeof lastSegment == "object" && lastSegment.type == ChatSegmentType.emote) {
                data.extra.gigantic = lastSegment;
                data.segments.pop();
            }
        }

        return data;
    }, [message]);
    
    return (
        <messageContext.Provider value={messageData}>
            {children}
        </messageContext.Provider>
    )
}
