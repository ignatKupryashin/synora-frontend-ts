import {$notificationApi} from "../http";
import {SynoraNotification} from "../models/Notification/SynoraNotification";

export default class NotificationService {
    static async sendNotification(notification: SynoraNotification) {
        return await $notificationApi.post('/notification', notification);
    }
}