import { Request, Response } from "express";
import { NotificationRepository } from "../model/repository/NotificationRepository";
import { Notification } from "../model/Notification";

export class NotificationCreate {

    constructor(readonly repository: NotificationRepository) {

    }

    async execute(request: Request, response: Response) {
        const {descricao, data, usuario_id} = request.body;

        if(!descricao || !data || !usuario_id) {
            response.status(422).json({message: "O usuário não informou algum campo"})
        }
        const notification = Notification.create(descricao, data, usuario_id);
        await this.repository.save(notification);
        response.status(201).json({notification});
    }
}