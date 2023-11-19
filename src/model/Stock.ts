import { Uuid } from "./Uuid"

export class Stock {
    private acao_id: Uuid
    private cotacao: number
    private papeis_disponiveis: number
    private lucro_liquido_anual: number
    private nome: string

    constructor(cotacao: number, papeis_disponiveis: number, lucro_liquido_anual: number, nome: string, acao_id?: string) {
        this.cotacao = cotacao
        this.papeis_disponiveis = papeis_disponiveis
        this.lucro_liquido_anual = lucro_liquido_anual
        this.nome = nome
        this.acao_id = acao_id ? new Uuid(acao_id) : Uuid.randomGenerator()
    }
    
    static create(cotacao: number, papeis_disponiveis: number, lucro_liquido_anual: number, nome: string, acao_id?: string): Stock {
        return new Stock(cotacao, papeis_disponiveis, lucro_liquido_anual, nome, acao_id)
    }

    public getId(): Uuid {
        return this.acao_id
    }

    public getNome(): string {
        return this.nome
    }
    
    public getCotacao(): number {
        return this.cotacao
    }
    
    public getPapeisDisponiveis(): number {
        return this.papeis_disponiveis
    }

    public getLucroLiquidoAnual(): number {
        return this.lucro_liquido_anual
    }
}