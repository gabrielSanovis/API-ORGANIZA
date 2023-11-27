import { Request, Response } from "express";
import { ExtractRepository } from "../model/repository/ExtractRepository";
import { Uuid } from "../model/Uuid";

export class ExtractGetById {

    constructor(readonly repository: ExtractRepository) {

    }

    async execute(request: Request, response: Response) {
        let id: string | Uuid = request.params.id
        if(!id) {
            return response.status(422).json({message: "O usuário não informou o campo"})
        }
        id = new Uuid(id);
        const extract = await this.repository.getById(id)
        response.status(201).json({extract})
    }
}