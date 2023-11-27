import { Request, Response } from "express";
import { ExtractRepository } from "../model/repository/ExtractRepository";
import { Extract } from "../model/Extract";

export class ExtractCreate {

    constructor(readonly repository: ExtractRepository) {

    }

    async execute(request: Request, response: Response) {
        const {valor, data, tipo, usuario_id, acao_id, categoria_id} = request.body;

        if(!valor || !data || !tipo || !usuario_id) {
            response.status(422).json({message: "O usuário não informou algum campo"})
        }
        const extract = Extract.create(valor, data, tipo, usuario_id, acao_id ?? null);
        await this.repository.save(extract, categoria_id);
        response.status(201).json({...extract, categoria_id: categoria_id});
    }
}