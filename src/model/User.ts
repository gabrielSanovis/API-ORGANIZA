import { Uuid } from "./Uuid"

export class User {
    private usuario_id: Uuid
    private nome: string
    private senha: string
    private email: string

    constructor(nome: string, senha: string, email: string, usuario_id?: string) {
        this.nome = nome
        this.email = email
        this.senha = senha
        this.usuario_id = usuario_id ? new Uuid(usuario_id) : Uuid.randomGenerator()
    }
    
    static create( nome: string, senha: string, email: string, usuario_id?: string): User {
        return new User( nome, senha, email, usuario_id)
    }

    public getId(): Uuid {
        return this.usuario_id
    }

    public getNome(): string {
        return this.nome
    }

    public getSenha(): string {
        return this.senha
    }

    public getEmail(): string {
        return this.email
    }
}