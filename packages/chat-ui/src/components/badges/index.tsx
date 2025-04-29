import { TwitchBadge } from "./twitch";
import { YoutubeBadge } from "./youtube";

export interface BadgeProps {
    size?: number;
    className?: string;
}

const PLATFORM_BADGES: Record<string, React.FC<BadgeProps>> = {
    youtube: YoutubeBadge,
    twitch: TwitchBadge
}

interface PlatformBadgeProps extends BadgeProps {
    platform: string;
}

export function PlatformBadge({ platform, ...props }: PlatformBadgeProps) {
    if (platform in PLATFORM_BADGES) {
        const Badge = PLATFORM_BADGES[platform];
        return <Badge {...props}/>
    }
}
