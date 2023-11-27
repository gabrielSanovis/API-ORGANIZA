import { Request, Response } from "express";
import { NotificationRepository } from "../model/repository/NotificationRepository";
import { Uuid } from "../model/Uuid";

export class NotificationRemoveById {

    constructor(readonly repository: NotificationRepository) {

    }

    async execute(request: Request, response: Response) {
        let id: string | Uuid = request.params.id
        if(!id) {
            return response.status(422).json({message: "O usuário não informou o campo"})
        }

        id = new Uuid(id);

        await this.repository.remove(id)
        response.status(201).json({menssage: "Notificação deletada com sucesso."})
    }
}