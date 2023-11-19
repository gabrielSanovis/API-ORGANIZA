import { Uuid } from "./Uuid"

export class Notification {
    private notificacao_id: Uuid
    private descricao: string
    private data: string
    private fk_usuario_id: string

    constructor(descricao: string, data: string, fk_usuario_id: string, notificacao_id?: string) {
        this.descricao = descricao
        this.data = data
        this.fk_usuario_id = fk_usuario_id
        this.notificacao_id = notificacao_id ? new Uuid(notificacao_id) : Uuid.randomGenerator()
    }
    
    static create( descricao: string, data: string, fk_usuario_id: string, notificacao_id?: string): Notification {
        return new Notification( descricao, data, fk_usuario_id, notificacao_id)
    }

    public getId(): Uuid {
        return this.notificacao_id
    }

    public getDescricao(): string {
        return this.descricao
    }

    public getData(): string {
        return this.data
    }

    public getUserId(): string {
        return this.fk_usuario_id
    }
}