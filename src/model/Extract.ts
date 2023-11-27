import { Uuid } from "./Uuid"

export class Extract {
    private extrato_id: Uuid
    private valor: number
    private data: string
    private tipo: string
    private usuario_id: string
    private acao_id: string | null

    constructor(valor: number, data: string, tipo: string, usuario_id: string, acao_id?: string | null, extrato_id?: string) {
        this.valor = valor
        this.data = data
        this.tipo = tipo
        this.usuario_id = usuario_id
        this.acao_id = acao_id ? acao_id : null
        this.extrato_id = extrato_id ? new Uuid(extrato_id) : Uuid.randomGenerator()
    }
    
    static create(valor: number, data: string, tipo: string, usuario_id: string, acao_id?: string | null, extrato_id?: string): Extract {
        return new Extract(valor, data, tipo, usuario_id, acao_id, extrato_id)
    }

    public getId(): Uuid {
        return this.extrato_id
    }

    public getValor(): number {
        return this.valor
    }

    public getData(): string {
        return this.data
    }

    public getTipo(): string {
        return this.tipo
    }

    public getUserId(): string {
        return this.usuario_id
    }

    public getStockId(): string | null {
        return this.acao_id
    }
}