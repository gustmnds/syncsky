import { PaidMessageEvent } from "@syncsky/youtube-chat-module";
import { PlatformBadge } from "../../badges";
import { NotificationBase } from "../notification-base";
import { NotificationEventProps } from "../notification";

export function PaidNotification({ event }: NotificationEventProps<PaidMessageEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={<span>enviou um donate no valor de <b>{event.value.amount}</b></span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    );
}
