import knex, { Knex } from "knex";
import { Stock } from "../../../model/Stock";
import { development } from "./KnexConfig";
import { StockRepository } from "../../../model/repository/StockRepository";
import { Uuid } from "../../../model/Uuid";

export class StockRepositoryDatabase implements StockRepository {
    private connection: Knex
    constructor() {
        this.connection = knex(development)
    }
   
    async save(stock: Stock): Promise<void> {
        this.connection('stock').insert({
            'acao_id': stock.getId().getValue(),
            'cotacao': stock.getCotacao(),
            'papeis_disponiveis': stock.getPapeisDisponiveis(),
            'lucro_liquido_anual': stock.getLucroLiquidoAnual(),
            'nome': stock.getNome()
        }).then( function (result) {
            console.log({ success: true, message: result });     // respond back to request
         })
    }

    async getAll(): Promise<Stock[]> {
        const stockCollection: Array<Stock> = [];
        const stocks = await this.connection('stock').select('*');
        console.log(stocks);
        for(let stock of stocks) {
            const acaoId = stock.acao_id;
            const cotacao = stock.cotacao;
            const papeisDisponiveis = stock.papaeis_disponiveis;
            const lucroLiquidoAnual = stock.lucro_liquido_anual;
            const nome = stock.nome;
            stockCollection.push(Stock.create(cotacao, papeisDisponiveis, lucroLiquidoAnual, nome, acaoId))

        }
        return stockCollection;
    }

    async getById(id: Uuid): Promise<Stock> {
        const [stock] = await this.connection('stock').select('*').where({ "acao_id": id.getValue()}).limit(1);
        if(!stock) {
            throw new Error(`Stock not found: ${id}`)
        }
        return Stock.create(stock['cotacao'], stock['papeis_disponiveis'], stock['lucro_liquido_anual'], stock['nome'], stock['acao_id']);
    }
    
}