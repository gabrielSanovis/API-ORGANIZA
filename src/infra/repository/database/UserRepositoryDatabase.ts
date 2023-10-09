import knex, { Knex } from "knex";
import { User } from "../../../model/User";
import { UserRepository } from "../../../model/repository/UserRepository";
import { development } from "./KnexConfig";

export class UserRepositoryDatabase implements UserRepository {
    private connection: Knex
    constructor() {
        this.connection = knex(development)
    }

    async save(user: User): Promise<void> {
        this.connection('user').insert({
            'usuario_id': user.getId().getValue(),
            'nome': user.getNome(),
            'email': user.getEmail(),
            'senha': user.getSenha()
        }).then( function (result) {
            console.log({ success: true, message: result });     // respond back to request
         })
    }
    async getAll(): Promise<User[]> {
        const userCollection: Array<User> = []
        const users = await this.connection('user').select('*')
        console.log(users)
        for(let user of users) {
            const usuario_id = user.usuario_id
            const nome = user.nome
            const email = user.email
            const senha = user.senha
            userCollection.push(User.create(nome, senha, email, usuario_id))
        }
        return userCollection
    }
    
}