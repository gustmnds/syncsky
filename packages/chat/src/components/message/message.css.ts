import { style } from "@vanilla-extract/css";

export const MessageContainer = style({
    display: "inline-block",
    lineHeight: 1.5
});

export const MessageAuthorContainer = style({
    display: "inline-block"
});

export const MessageAuthor = style({
    fontWeight: 700,
    display: "inline-block",
    verticalAlign: "middle"
});

export const MessageBadges = style({
    display: "inline-block"
});

export const MessageBadgeIcon = style({
    marginRight: 3,
    borderRadius: 3,
    verticalAlign: "middle"
})

export const MessageSegment = style({
    marginRight: "4.5px",
    display: "inline-block"
});
