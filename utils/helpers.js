import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const NOTIFICATION_KEY = "FlashCardApp:notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Notifications.getPermissionsAsync().then(async ({ status }) => {
                    if (status === "granted") {
                        Notifications.cancelAllScheduledNotificationsAsync();

                        let tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        tomorrow.setHours(20);
                        tomorrow.setMinutes(0);

                        Notifications.scheduleNotificationAsync({
                            content: {
                                title: "Let's take a quiz !",
                                body: "👋 You didn't take any quiz today",
                                data: { data: "goes here" },
                            },
                            trigger: {
                                seconds:
                                    (tomorrow.getTime() - Date.now()) / 1000,
                            },
                        });

                        AsyncStorage.setItem(
                            NOTIFICATION_KEY,
                            JSON.stringify(true)
                        );
                    } else {
                    }
                });
            }
        });
}
