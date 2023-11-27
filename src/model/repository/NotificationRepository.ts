import { Notification } from "../Notification";
import { Uuid } from "../Uuid";

export interface NotificationRepository {
    save(notification: Notification): Promise<void>
    getAll(): Promise<Notification[]>
    getById(id: Uuid): Promise<Notification>
    remove(id: Uuid): Promise<void>
}