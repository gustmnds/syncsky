import { useMessageContext } from "../context/message-context"

export function MessageModifierGigantic() {
    const message = useMessageContext();
    
    if (!message.extra.gigantic) return;
    
    return (
        <div className="gigantic-emote-container" style={{ display: "block" }}>
            <img
                src={message.extra.gigantic.url}
                className="gigantic-emote"
            />
        </div>
    );
}
