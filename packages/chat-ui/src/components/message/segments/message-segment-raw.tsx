import { MessageSegmentProps } from ".";

export function MessageSegmentRaw({ segment }: MessageSegmentProps<string>) {
    return (
        <span className="message-text-segment">{segment}</span>
    )
}
