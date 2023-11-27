import { Request, Response } from "express";
import { ExtractRepository } from "../model/repository/ExtractRepository";

export class ExtractList {

    constructor(readonly repository: ExtractRepository) {

    }

    async execute(request: Request, response: Response) {
        const extracts = await this.repository.getAll()
        response.status(201).json({extracts})
    }
}