import { SubEvent } from "@syncsky/twitch-chat-module";
import { PlatformBadge } from "../../badges";
import { NotificationBase } from "../notification-base";
import { NotificationEventProps } from "../notification";

export function SubNotification({ event }: NotificationEventProps<SubEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={
                <span>
                    se inscreveu por <b>{event.value.months}</b> meses
                    {event.value.isPrime && " usando prime"}
                </span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    );
}
