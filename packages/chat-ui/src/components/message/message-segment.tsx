import { useMessageContext } from "./context/message-context";
import { MessageSegment } from "./segments";

export function MessageContent() {
    const message = useMessageContext();
    return (
        <span className="content">
            {message.segments.map(
                (segment, key) => <MessageSegment key={key} segment={segment}/>
            )}
        </span>
    )
}
