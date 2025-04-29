import { ChatEmoteSegment, ChatTextSegment } from "@syncsky/chat-api";
import { MessageSegmentProps } from ".";
import { MessageSegmentText } from "./message-segment-text";
import React from "react";

export function MessageSegmentEmote({ segment }: MessageSegmentProps<ChatEmoteSegment>) {
    const emoteWidth = (segment.options?.width || 28) / 16;
    const emoteheight = (segment.options?.height || 28) / 16;
    
    return (
        <span className="message-emote-segment">
            <div className="emote-container">
                <img
                    className="emote"
                    src={segment.url}
                    style={{ "--width": emoteWidth, "--height": emoteheight } as React.CSSProperties}
                />
                {segment.text && (
                    <MessageSegmentText
                        data-emote-text="true"
                        segment={segment.text as ChatTextSegment}
                    />
                )}
            </div>
        </span>
    )
}
