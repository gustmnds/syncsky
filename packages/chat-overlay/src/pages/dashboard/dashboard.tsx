import "react-mosaic-component/react-mosaic-component.css"
import React from "react";
import { Mosaic, MosaicZeroState } from "react-mosaic-component";
import { ChatContextProvider } from "@/context/chat";
import { Panel } from "@/components/panel/panel";
import { ChatPage } from "../chat-page";
import { NotificationPage } from "../notification-page";
import * as S from "./dashboard.css";

const TILES: Record<string, { title: string, element: React.JSX.Element }> = {
    CHAT: {
        title: "CHAT",
        element: <ChatContextProvider children={<ChatPage/>}/>
    },
    NOTIFICATIONS: {
        title: "NOTIFICAÇÕES",
        element: <NotificationPage/>
    }
};

export function DashboardPage() {
    return (
        <Mosaic
            className={S.Panels}
            zeroStateView={<MosaicZeroState/>}
            renderTile={(id, path) => (<Panel path={path} title={TILES[id].title}>{TILES[id].element}</Panel>)}
            initialValue={{
                direction: "row",
                first: "CHAT",
                second: "NOTIFICATIONS",
                splitPercentage: 50
            }}
        />
    )
}
