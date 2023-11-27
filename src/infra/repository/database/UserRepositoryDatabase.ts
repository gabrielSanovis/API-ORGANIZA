import knex, { Knex } from "knex";
import { User } from "../../../model/User";
import { UserRepository } from "../../../model/repository/UserRepository";
import { development } from "./KnexConfig";
import { Uuid } from "../../../model/Uuid";
import { UserUpdateDTO } from "../../../controller/dtos/UserUpdateDTO";


export class UserRepositoryDatabase implements UserRepository {
    private connection: Knex;
    constructor() {
        this.connection = knex(development);
    }

    async save(user: User): Promise<void> {
        this.connection('user').insert({
            'usuario_id': user.getId().getValue(),
            'nome': user.getNome(),
            'email': user.getEmail(),
            'senha': user.getSenha()
        }).then(function (result) {
            console.log({ success: true, message: result }); // respond back to request
        });
    }
    async getAll(): Promise<User[]> {
        const userCollection: Array<User> = [];
        const users = await this.connection('user').select('*');
        console.log(users);
        for (let user of users) {
            const usuario_id = user.usuario_id;
            const nome = user.nome;
            const email = user.email;
            const senha = user.senha;
            userCollection.push(User.create(nome, senha, email, usuario_id));
        }
        return userCollection;
    }
    
    async getById(email: string): Promise<User> {
        const user = await this.connection('user').select('*').where({ "email": email}).limit(1);
        if(!user) {
            throw new Error(`User not found: ${email}`)
        }
        return User.create(user[0]['nome'], user[0]['senha'], user[0]['email'], user[0]['usuario_id']);
    }

    async remove(id: Uuid): Promise<void> {
        await this.connection('notification').where({ "usuario_id": id.getValue()}).delete();
        const extratos = await this.connection('extract').select('extrato_id').where({ "usuario_id": id.getValue()});
        for(let extrato of extratos) {
            await this.connection('extract_category').where({'extrato_id': extrato.extrato_id}).delete();
        }
        await this.connection('extract').where({ "usuario_id": id.getValue()}).delete()
        await this.connection('user').where({ "usuario_id": id.getValue()}).delete();
    }

    async update(email: string, userDTO: UserUpdateDTO): Promise<User> {
        await this.connection('user').where({"email": email}).update({
            "nome": userDTO.nome,
            "senha": userDTO.senha
        })
        return await this.getById(email)
    }

}
