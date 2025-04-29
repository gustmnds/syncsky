import { ChatBaseEvent } from "@syncsky/chat-api";

export interface PaidMessageEvent extends ChatBaseEvent<"PAID_MESSAGE", {
    name: string;
    message?: string;
    amount: string;
}>{}
