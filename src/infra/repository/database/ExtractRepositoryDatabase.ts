import knex, { Knex } from "knex";
import { development } from "./KnexConfig";
import { ExtractRepository } from "../../../model/repository/ExtractRepository";
import { Extract } from "../../../model/Extract";
import { Uuid } from "../../../model/Uuid";

export class ExtractRepositoryDatabase implements ExtractRepository {
    private connection: Knex
    constructor() {
        this.connection = knex(development)
    }

    async saveRelationshipBetweenExtractCategory(extractID: string, categoryID: string) {
        const extractCategoryID = Uuid.randomGenerator().getValue();
        this.connection('extract_category')
            .insert({
                'extrato_id': extractID,
                'categoria_id': categoryID,
                'extrato_categoria_id': extractCategoryID
            }).then(result => {
                console.log({success: true, message: result}); // response back to request
            })
    }
    
    async save(extract: Extract, categoryID: string): Promise<void> {
        const extractID = extract.getId().getValue()
        this.connection('extract')
            .insert({
                'extrato_id': extractID,
                'valor': extract.getValor(),
                'tipo': extract.getTipo(),
                'usuario_id': extract.getUserId(),
                'acao_id': extract.getStockId(),
                'data': extract.getData()
            }).then(result => {
                console.log({success: true, message: result}); // response back to request
                this.saveRelationshipBetweenExtractCategory(extractID, categoryID)
            })
    }

    async getAll(): Promise<Extract[]> {
        const extractCollection: Array<Extract> = [];

        const extracts = await this.connection('extract')
        .select("extract.extrato_id", "valor", "data", "tipo", "category.nome AS categoria", "stock.nome AS acao")
        .join("extract_category", "extract.extrato_id", "=", "extract_category.extrato_id")
        .join("category", "extract_category.categoria_id", "=", "category.categoria_id")
        .modify((queryBuilder) => {
            queryBuilder.leftJoin("stock", "stock.acao_id", "=", "extract.acao_id")
        })
        console.log(extracts);
        for(let extract of extracts) { 
            extractCollection.push(extract)
        }
        return extractCollection;
    }

    async getById(id: Uuid): Promise<Extract> {
        const [extract] = await this.connection('extract')
        .select("extract.extrato_id", "valor", "data", "tipo", "category.nome AS categoria", "stock.nome AS acao")
        .where({ "extract.extrato_id": id.getValue()})
        .join("extract_category", "extract.extrato_id", "=", "extract_category.extrato_id")
        .join("category", "extract_category.categoria_id", "=", "category.categoria_id")
        .modify((queryBuilder) => {
            queryBuilder.leftJoin("stock", "stock.acao_id", "=", "extract.acao_id")
        });
        if(!extract) {
            throw new Error(`Extract not found: ${id}`)
        }
        return extract;
    }

}