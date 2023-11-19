import { Request, Response } from "express";
import { StockRepository } from "../model/repository/StockRepository";

export class StockList {

    constructor(readonly repository: StockRepository) {

    }

    async execute(request: Request, response: Response) {
        const stocks = await this.repository.getAll()
        response.status(201).json({stocks})
    }
}