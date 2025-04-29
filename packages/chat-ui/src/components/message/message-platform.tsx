import React from "react";
import { BadgeProps, TwitchIcon, YoutubeIcon } from "../../../../chat-overlay/src/components/badges";
import { useMessageContext } from "./context/message-context";

const PLATFORM_BADGES: Record<string, React.FC<BadgeProps> | undefined> = {
    twitch: TwitchIcon,
    youtube: YoutubeIcon
}

export function MessagePlatformBadge() {
    const message = useMessageContext();
    const Badge = PLATFORM_BADGES[message.platform];

    if (Badge) {
        return <Badge className="badge"/>
    }
}
