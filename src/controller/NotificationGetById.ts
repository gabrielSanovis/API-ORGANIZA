import { Request, Response } from "express";
import { NotificationRepository } from "../model/repository/NotificationRepository";
import { Uuid } from "../model/Uuid";

export class NotificationGetById {

    constructor(readonly repository: NotificationRepository) {

    }

    async execute(request: Request, response: Response) {
        let id: string | Uuid = request.params.id
        if(!id) {
            return response.status(422).json({message: "O usuário não informou o campo"})
        }
        id = new Uuid(id);
        const notification = await this.repository.getById(id)
        response.status(201).json({notification})
    }
}