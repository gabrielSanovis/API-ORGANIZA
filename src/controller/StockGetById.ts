import { Request, Response } from "express";
import { StockRepository } from "../model/repository/StockRepository";
import { Uuid } from "../model/Uuid";

export class StockGetById {

    constructor(readonly repository: StockRepository) {

    }

    async execute(request: Request, response: Response) {
        let id: string | Uuid = request.params.id
        if(!id) {
            return response.status(422).json({message: "O usuário não informou o campo"})
        }
        id = new Uuid(id);
        const stock = await this.repository.getById(id)
        response.status(201).json({stock})
    }
}