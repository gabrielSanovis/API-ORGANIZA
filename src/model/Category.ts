import { Uuid } from "./Uuid"

export class Category {
    private categoria_id: Uuid
    private nome: string

    constructor(nome: string, categoria_id?: string) {
        this.nome = nome;
        this.categoria_id = categoria_id ? new Uuid(categoria_id) : Uuid.randomGenerator();
    }
    
    static create(nome: string, categoria_id?: string): Category {
        return new Category(nome, categoria_id)
    }

    public getId(): Uuid {
        return this.categoria_id
    }

    public getNome(): string {
        return this.nome
    }
}