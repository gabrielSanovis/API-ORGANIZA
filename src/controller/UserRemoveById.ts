import { Request, Response } from "express";
import { UserRepository } from "../model/repository/UserRepository";
import { Uuid } from "../model/Uuid";

export class UserRemoveById {

    constructor(readonly repository: UserRepository) {

    }

    async execute(request: Request, response: Response) {
        let id: string | Uuid = request.params.id
        if(!id) {
            return response.status(422).json({message: "O usuário não informou o campo email"})
        }

        id = new Uuid(id);

        await this.repository.remove(id)
        response.status(201).json({menssage: "Usuário deletado com sucesso."})
    }
}