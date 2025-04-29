import React from "react";
import * as S from "./panel.css";
import { cm } from "@/utils/class";
import { MosaicBranch, MosaicWindow } from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";

interface PanelProps {
    path: MosaicBranch[];
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function Panel({ title, children, path, className }: PanelProps) {
    return (
        <MosaicWindow
            path={path}
            title={title}
            className={cm(S.Panel, className)}
            renderToolbar={() => <span className={S.Title}>{title}</span>}>
            <div className={S.Container}>
                {children}
            </div>
        </MosaicWindow>
    );
}
