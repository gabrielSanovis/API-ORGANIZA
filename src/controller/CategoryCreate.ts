import { Request, Response } from "express";
import { CategoryRepository } from "../model/repository/CategoryRepository";
import { Category } from "../model/Category";

export class CategoryCreate {

    constructor(readonly repository: CategoryRepository) {

    }

    async execute(request: Request, response: Response) {
        const {nome} = request.body;

        if(!nome) {
            response.status(422).json({message: "O usuário não informou algum campo"})
        }
        const category = Category.create(nome);
        await this.repository.save(category);
        response.status(201).json({category});
    }
}