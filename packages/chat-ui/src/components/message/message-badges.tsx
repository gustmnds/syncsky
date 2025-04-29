import { useMessageContext } from "./context/message-context"
//import { MessagePlatformBadge } from "./message-platform";

export function MessageBadges() {
    const message = useMessageContext();
    return (
        <div className="badges">
            {/*<MessagePlatformBadge/>*/}
            {message.platformBadge}
            {message.badges.map((badge, idx) => (
                <img
                    alt="badge"
                    className="badge"
                    key={idx}
                    src={badge}
                />
            ))}
        </div>
    )
}
