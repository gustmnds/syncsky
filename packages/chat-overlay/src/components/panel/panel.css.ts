import { globalStyle, style } from "@vanilla-extract/css";

export const Panel = style({
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    overflow: "hidden"
});

globalStyle(`${Panel} .mosaic-window-toolbar`, {
    background: "transparent"
});

globalStyle(`${Panel} .mosaic-window-body`, {
    background: "transparent"
});

export const Title = style({
    color: "#EAEAEA",
    fontWeight: "700",
    backgroundColor: "#1F1F23",
    width: "100%",
    padding: "1rem",
    userSelect: "none"
});

export const Container = style({
    width: "100%",
    height: "100%",
    padding: "0.5rem",
    overflowY: "auto",
    backgroundColor: "#18181B",
    "::-webkit-scrollbar": {
        backgroundColor: "transparent",
        width: "8px"
    },
    "::-webkit-scrollbar-thumb": {
        backgroundColor: "#40404A",
        borderRadius: "99999px"
    }
});
