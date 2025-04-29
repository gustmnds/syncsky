import { RegisterUI } from "@syncsky/chat-api";
import * as Notifications from "../notifications";

RegisterUI({
    register(ui) {
        ui.registerNotification(
            Notifications.PaidMessageNotification,
            { platform: "youtube", event: "PAID_MESSAGE" }
        );
    },
})
