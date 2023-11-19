import { Request, Response } from "express";
import { NotificationRepository } from "../model/repository/NotificationRepository";

export class NotificationList {

    constructor(readonly repository: NotificationRepository) {

    }

    async execute(request: Request, response: Response) {
        const notifications = await this.repository.getAll()
        response.status(201).json({notifications})
    }
}