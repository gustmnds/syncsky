import { globalStyle, style } from "@vanilla-extract/css";

export const Panels = style({
    width: "100dvw",
    height: "100dvh",
    display: "flex",
    gap: "0.5rem",
    padding: "0.5rem"
});

globalStyle(`${Panels} .mosaic-window-toolbar`, {
    height: "unset"
})

globalStyle(`${Panels} .mosaic-split`, {
    background: "none"
});

globalStyle(`${Panels} .mosaic-split:hover .mosaic-split-line`, {
    boxShadow: "0 0 0 1px #BA3C6A"
});

globalStyle(`${Panels} .mosaic-split:active .mosaic-split-line`, {
    boxShadow: "0 0 0 1px #BA3C6A"
});

export const ChatPanel = style({
    width: "100%"
});

export const NotificationsPanel = style({
    width: "100%"
});
