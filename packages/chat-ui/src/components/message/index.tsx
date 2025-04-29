import React from "react";
import { ChatMessage } from "@syncsky/chat-api";
import { MessageContextProvider } from "./context/message-context-provider";
import { MessageBadges } from "./message-badges";
import { MessageAuthor } from "./message-author";
import { MessageContent } from "./message-segment";
import { MessageModifierGigantic } from "./modifiers/message-modifier-gigantic";

export interface MessageProps {
    message: ChatMessage;
    platformBadge?: React.JSX.Element;
}

export function Message({message, platformBadge}: MessageProps) {
    return (
        <MessageContextProvider message={message} platformBadge={platformBadge}>
            <div className="message" data-platform={message.platform} data-deleted={"deleted" in message}>
                <div className="author-details">
                    <MessageBadges/>
                    <MessageAuthor/>
                </div>
                <span style={{ verticalAlign: "middle" }}>: </span>
                <MessageContent/>
                <MessageModifierGigantic/>
            </div>
        </MessageContextProvider>
    )
}
