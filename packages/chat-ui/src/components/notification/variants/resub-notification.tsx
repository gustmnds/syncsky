import { ResubEvent } from "@syncsky/twitch-chat-module";
import { PlatformBadge } from "../../badges";
import { NotificationBase } from "../notification-base";
import { NotificationEventProps } from "../notification";

export function ResubNotification({ event }: NotificationEventProps<ResubEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={
                <span>
                    se reinscreveu por <b>{event.value.months}</b> meses
                    {event.value.isPrime && " usando prime"}
                </span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    );
}
