import EventEmitter from "eventemitter3";
import { ChatManager } from "../chat-manager";
import { ChatBaseEvent } from "../dto/event-base";

interface ChatModuleEvents {
    stop: [];
    resume: [];
    disconnect: [];
}

export class ChatModule extends EventEmitter<ChatModuleEvents> {
    constructor(
        public readonly platform: string,
        private readonly manager: ChatManager
    ) {
        super();
    }
    
    public pushEvent<T extends ChatBaseEvent = ChatBaseEvent>(event: Omit<T, "platform">) {
        this.manager.pushEvent({ ...event, platform: this.platform });
    }
}
