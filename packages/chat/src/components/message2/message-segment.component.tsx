import { ChatSegment, ChatSegmentType } from "@syncsky/chat-api";

interface MessageSegmentComponentProps {
    segment: ChatSegment
}


export function MessageSegment({ segment }: MessageSegmentComponentProps) {
    if (typeof segment == "string") {
        return (
            <span>{segment}</span>
        )
    }

    if (segment.type == ChatSegmentType.emote) {
        return (
            <span>
                <div style={{ display: "inline-block", marginInline: "4px" }}>
                    <img
                        src={segment.url}
                        style={{ display: "inline", verticalAlign: "middle", marginBlock: "-5px" }}
                        width={segment.options?.width || 28}
                        height={segment.options?.height || 28}
                    />
                    {segment.text && <MessageSegment segment={segment.text as ChatSegment}/>}
                </div>
            </span>
        )
    }
    
    return (
        <span style={segment.style}>{segment.content}</span>
    )
}
