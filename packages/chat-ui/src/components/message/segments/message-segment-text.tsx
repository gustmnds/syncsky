import { ChatTextSegment } from "@syncsky/chat-api";
import { MessageSegmentProps } from ".";

export function MessageSegmentText({ segment }: MessageSegmentProps<ChatTextSegment>) {
    return (
        <span className="message-text-segment" style={segment.style}>{segment.content}</span>
    )
}
