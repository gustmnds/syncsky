import EventEmitter from "eventemitter3";
import { ChatBaseEvent } from "../dto";
import { ChatManager } from "../chat-manager";

interface ChatExtensionEvents {
    stop: [];
    resume: [];
    disconnect: [];
    onEvent: [event: ChatBaseEvent];
}

type EventCallback = (event: ChatBaseEvent) => void | Promise<void>;

export class ChatExtension extends EventEmitter<ChatExtensionEvents> {
    private eventCallbacks = new Set<EventCallback>();
    constructor(private readonly manager: ChatManager) {
        super();
    }

    public async processEvent(event: ChatBaseEvent) {
        for (const callback of this.eventCallbacks) {
            await callback(event);
        }
    }

    public onEvent(callback: EventCallback) {
        this.eventCallbacks.add(callback);
    }

    public offEvent(callback: EventCallback) {
        this.eventCallbacks.delete(callback);
    }

    public pushEvent<T extends ChatBaseEvent = ChatBaseEvent>(event: T) {
        this.manager.pushEvent(event);
    }
}
