import { Request, Response } from "express";
import { CategoryRepository } from "../model/repository/CategoryRepository";

export class CategoryList {

    constructor(readonly repository: CategoryRepository) {

    }

    async execute(request: Request, response: Response) {
        const categorys = await this.repository.getAll()
        response.status(201).json({categorys})
    }
}