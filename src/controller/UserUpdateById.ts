import { Request, Response } from "express";
import { UserRepository } from "../model/repository/UserRepository";
import { User } from "../model/User";
import { UserUpdateDTO } from "./dtos/UserUpdateDTO";

export class UserUpdateById {

    constructor(readonly repository: UserRepository) {

    }

    async execute(request: Request, response: Response) {
        const {nome, senha, usuario_id} = request.body
        const email = request.params.email
        if(!senha || !nome || !usuario_id ) {
            return response.status(422).json({message: "O usuário não informou algum campo"})
        }
        if(!email ) {
            return response.status(422).json({message: "O usuário não informou algum parametro"})
        }
        let user = User.create(nome, senha, email, usuario_id)
        user.update(nome, senha);
        console.log(user.getNome())
        const userDTO = new UserUpdateDTO(user.getNome(), user.getSenha())
        user = await this.repository.update(email, userDTO)
        response.status(200).json({user})
    }
}