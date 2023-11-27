import { Request, Response } from "express";
import { UserRepository } from "../model/repository/UserRepository";

export class UserGetById {

    constructor(readonly repository: UserRepository) {

    }

    async execute(request: Request, response: Response) {
        const email: string = request.params.email
        if(!email) {
            return response.status(422).json({message: "O usuário não informou o campo email"})
        }

        const user = await this.repository.getById(email)
        response.status(201).json({user})
    }
}