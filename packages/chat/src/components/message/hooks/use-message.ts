import * as Logos from "@/components/logos"
import { IconProps } from "@/components/logos/icon";
import { ChatEmoteSegment, ChatMessage, ChatMessageModifier, ChatSegmentType } from "@syncsky/chat-api";
import React, { useMemo } from "react";

export interface ChatMessageExtended extends ChatMessage {
    extra: {
        logo?: React.FC<IconProps>,
        gigantic?: ChatEmoteSegment
    }
}

const PLATFORM_LOGOS: Record<string, React.FC<IconProps>> = {
    twitch: Logos.TwitchIcon,
    youtube: Logos.YoutubeIcon
}

export function useMessage(message: ChatMessage): ChatMessageExtended {
    return useMemo(() => {
        const data: ChatMessageExtended = {
            ...message,
            segments: message.segments.slice(),
            extra: {}
        };

        if (data.modifiers.includes(ChatMessageModifier.GIGANTIC_EMOTE)) {
            const emote = data.segments.findLast(
                (segment) => typeof segment == "object" && segment.type == ChatSegmentType.emote
            );

            data.segments = data.segments.filter((segment) => segment !== emote);
            data.extra.gigantic = emote;
        }

        if (message.platform in PLATFORM_LOGOS) {
            data.extra.logo = PLATFORM_LOGOS[message.platform];
        }

        return data;
    }, [message]);
}
