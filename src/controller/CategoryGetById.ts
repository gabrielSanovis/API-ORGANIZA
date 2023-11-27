import { Request, Response } from "express";
import { CategoryRepository } from "../model/repository/CategoryRepository";
import { Uuid } from "../model/Uuid";

export class CategoryGetById {

    constructor(readonly repository: CategoryRepository) {

    }

    async execute(request: Request, response: Response) {
        let id: string | Uuid = request.params.id
        if(!id) {
            return response.status(422).json({message: "O usuário não informou o campo"})
        }
        id = new Uuid(id);
        const category = await this.repository.getById(id)
        response.status(201).json({category})
    }
}