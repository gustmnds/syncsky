import React from "react";

export interface OverlayContextData {
    streamerMode: boolean;
}

export const OverlayContext = React.createContext<OverlayContextData | undefined>(undefined);

export function useOverlayContext() {
    const context = React.useContext(OverlayContext);
    if (context == undefined) {
        throw new Error("Missing OverlayContextProvider");
    }

    return context;
}
