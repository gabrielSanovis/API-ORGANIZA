import { Request, Response } from "express";
import { StockRepository } from "../model/repository/StockRepository";
import { Stock } from "../model/Stock";

export class StockCreate {

    constructor(readonly repository: StockRepository) {

    }

    async execute(request: Request, response: Response) {
        const {cotacao, papaeis_disponiveis, lucro_liquido_anual, nome} = request.body
        if(!cotacao || !papaeis_disponiveis || !lucro_liquido_anual || !nome) {
            return response.status(422).json({message: "O usuário não informou algum campo"})
        }
        const stock = Stock.create(cotacao,papaeis_disponiveis, lucro_liquido_anual, nome);
        await this.repository.save(stock)
        response.status(201).json({stock})
    }
}