import { BitsEvent } from "@syncsky/twitch-chat-module";
import { PlatformBadge } from "../../badges";
import { NotificationBase } from "../notification-base";
import { NotificationEventProps } from "../notification";

export function BitsNotification({ event }: NotificationEventProps<BitsEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={<span>enviou <b>{event.value.bits}</b> bits</span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    );
}
