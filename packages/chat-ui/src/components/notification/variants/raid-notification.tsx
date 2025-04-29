import { RaidEvent } from "@syncsky/twitch-chat-module";
import { PlatformBadge } from "../../badges";
import { NotificationBase } from "../notification-base";
import { NotificationEventProps } from "../notification";

export function RaidNotification({ event }: NotificationEventProps<RaidEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.channel}</b>}
            text={<span>enviou uma raid com <b>{event.value.viewerCount}</b> pessoa(s)</span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    );
}
