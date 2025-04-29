import React from "react";

export interface NotificationBaseProps {
    title: React.ReactNode;
    text: React.ReactNode;
    icon: React.JSX.Element;
}

export function NotificationBase(props: NotificationBaseProps) {
    return (
        <div className="notification">
            {props.icon}
            <div className="notification-content">
                {props.title}
                {props.text}
            </div>
        </div>
    );
}
 