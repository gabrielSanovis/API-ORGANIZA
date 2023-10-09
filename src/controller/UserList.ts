import { Request, Response } from "express";
import { UserRepository } from "../model/repository/UserRepository";

export class UserList {

    constructor(readonly repository: UserRepository) {

    }

    async execute(request: Request, response: Response) {
        const users = await this.repository.getAll()
        response.status(201).json({users})
    }
}