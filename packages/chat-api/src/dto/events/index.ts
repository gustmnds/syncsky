import { ChatBaseEvent } from "../event-base";

export * from "./follow-event"
export * from "./chat-message-event"
export * from "./chat-message-filter-event"

export function isEvent<T extends ChatBaseEvent>(event: T["event"], value: ChatBaseEvent): value is T {
    return value.event == event;
}
