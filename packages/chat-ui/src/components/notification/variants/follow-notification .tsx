import { FollowEvent } from "@syncsky/chat-api";
import { PlatformBadge } from "../../badges";
import { NotificationBase } from "../notification-base";
import { NotificationEventProps } from "../notification";

export function FollowNotification({ event }: NotificationEventProps<FollowEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={<span>começou a seguir</span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    );
}
