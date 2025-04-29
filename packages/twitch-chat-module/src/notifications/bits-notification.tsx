import { NotificationProps } from "@syncsky/chat-api";
import { PlatformBadge, NotificationBase } from "@syncsky/chat-ui";
import { BitsEvent } from "../twitch-events";

export function BitsNotification({ event }: NotificationProps<BitsEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={<span>enviou <b>{event.value.bits}</b> bits</span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    );
}
