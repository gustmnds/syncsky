import { NotificationProps } from "@syncsky/chat-api";
import { NotificationBase, PlatformBadge } from "@syncsky/chat-ui";
import { RaidEvent } from "../twitch-events";

export function RaidNotification({ event }: NotificationProps<RaidEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.channel}</b>}
            text={<span>enviou uma raid com <b>{event.value.viewerCount}</b> pessoa(s)</span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    );
}
