import { RegisterUI } from "@syncsky/chat-api";
import * as Notifications from "../notifications";

RegisterUI({
    register(ui) {
        ui.registerNotification(
            Notifications.BitsNotification,
            { platform: "twitch", event: "BITS" }
        );

        ui.registerNotification(
            Notifications.CommunityGiftSubNotification,
            { platform: "twitch", event: "COMMUNITY_GIFTSUB" }
        );

        ui.registerNotification(
            Notifications.FollowNotification,
            { platform: "twitch", event: "FOLLOW" }
        );

        ui.registerNotification(
            Notifications.GiftSubNotification,
            { platform: "twitch", event: "GIFTSUB" }
        );

        ui.registerNotification(
            Notifications.RaidNotification,
            { platform: "twitch", event: "RAID" }
        );

        ui.registerNotification(
            Notifications.ResubNotification,
            { platform: "twitch", event: "RESUB" }
        );

        ui.registerNotification(
            Notifications.RewardNotification,
            { platform: "twitch", event: "REWARD" }
        );

        ui.registerNotification(
            Notifications.SubNotification,
            { platform: "twitch", event: "SUB" }
        );
    },
})
