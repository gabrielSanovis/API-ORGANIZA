import { Request, Response } from "express";
import { UserRepository } from "../model/repository/UserRepository";
import { User } from "../model/User";

export class UserCreate {

    constructor(readonly repository: UserRepository) {

    }

    async execute(request: Request, response: Response) {
        const {nome, email, senha} = request.body
        if(!senha || !nome || !email) {
            return response.status(422).json({message: "O usuário não informou algum campo"})
        }
        const user = User.create(nome, senha, email)
        await this.repository.save(user)
        response.status(201).json({user})
    }
}