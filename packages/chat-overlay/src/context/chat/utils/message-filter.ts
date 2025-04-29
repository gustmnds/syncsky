import { ChatMessage, ChatMessageFilterEvent } from "@syncsky/chat-api";

export function MessageFilterMatch(message: ChatMessage, filter: ChatMessageFilterEvent) {
    if (filter.platform && message.platform !== filter.platform) {
        return false;
    }

    if (filter.value.authorId && message.author.authorId !== filter.value.authorId) {
        return false;
    }

    if (filter.value.messageId && message.messageId !== filter.value.messageId) {
        return false;
    }

    return true;
}
