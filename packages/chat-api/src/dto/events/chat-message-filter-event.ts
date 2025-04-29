import { ChatBaseEvent } from "../event-base";

export interface ChatMessageFilterEvent extends ChatBaseEvent<"CHAT_MESSAGE_FILTER", {
    messageId?: string;
    authorId?: string;
}> {};
