import { useMessageContext } from "./context/message-context"

export function MessageAuthor() {
    const message = useMessageContext();
    return (
        <span className="author" style={{ color: message.author.authorColor }}>
            {message.author.authorName}
        </span>
    );
}
