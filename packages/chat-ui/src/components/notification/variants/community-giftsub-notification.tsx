import { CommunityGiftSubEvent } from "@syncsky/twitch-chat-module";
import { PlatformBadge } from "../../badges";
import { NotificationBase } from "../notification-base";
import { NotificationEventProps } from "../notification";

export function CommunityGiftSubNotification({ event }: NotificationEventProps<CommunityGiftSubEvent>) {
    return (
        <NotificationBase
            title={<b>{event.value.name}</b>}
            text={<span>Presenteou a comunidade com <b>{event.value.count}</b> subgift(s)</span>}
            icon={<PlatformBadge platform={event.platform} size={20}/>}
        />
    )
}
