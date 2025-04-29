import React, { useMemo } from "react";
import { OverlayContext } from "./use-overlay-context";


interface OverlayContextProviderProps {
    children: React.ReactNode;
}

export function OverlayContextProvider({ children }: OverlayContextProviderProps) {

    const streamerMode = useMemo(() => /^(\d+?\.){3}\d+?$/g.test(window.location.hostname), []);
    
    return (
        <OverlayContext.Provider value={{ streamerMode }}>
            {children}
        </OverlayContext.Provider>
    )
}
