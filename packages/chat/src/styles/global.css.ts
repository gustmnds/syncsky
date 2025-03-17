import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
    margin: 0,
    padding: 0,
    boxSizing: "border-box"
});

globalStyle(":root", {
    fontFamily: "Inter, sans-serif"
});

globalStyle("body", {
    background: "#20202A",
    color: "#EAEAEA",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100dvw",
    height: "100dvh"
});
