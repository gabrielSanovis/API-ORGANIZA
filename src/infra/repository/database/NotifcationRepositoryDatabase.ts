import knex, { Knex } from "knex";
import { development } from "./KnexConfig";
import { NotificationRepository } from "../../../model/repository/NotificationRepository";
import { Notification } from "../../../model/Notification";

export class NotificationRepositoryDatabase implements NotificationRepository {
    private connection: Knex
    constructor() {
        this.connection = knex(development)
    }
    
    async save(notification: Notification): Promise<void> {
        this.connection('notification')
            .insert({
                'notificacao_id': notification.getId().getValue(),
                'descricao': notification.getDescricao(),
                'data': notification.getData(),
                'usuario_id': notification.getUserId()
            }).then(result => {
                console.log({success: true, message: result}); // response back to request
            })
    }

    async getAll(): Promise<Notification[]> {
        const notificationCollection: Array<Notification> = [];
        const notifications = await this.connection('notification').select('*');
        console.log(notifications);
        for(let notification of notifications) {
            const descricao = notification.descricao;
            const data = notification.data;
            const usuarioId = notification.usuario_id;
            const notificationId = notification.notificacao_id;
            notificationCollection.push(Notification.create(descricao, data, usuarioId, notificationId));
        }
        return notificationCollection;
    }

}