import knex, { Knex } from "knex";
import { development } from "./KnexConfig";
import { CategoryRepository } from "../../../model/repository/CategoryRepository";
import { Category } from "../../../model/Category";

export class CategoryRepositoryDatabase implements CategoryRepository {
    private connection: Knex
    constructor() {
        this.connection = knex(development)
    }
    
    async save(category: Category): Promise<void> {
        this.connection('category')
            .insert({
                'categoria_id': category.getId().getValue(),
                'nome': category.getNome()
            }).then(result => {
                console.log({success: true, message: result}); // response back to request
            })
    }

    async getAll(): Promise<Category[]> {
        const categoryCollection: Array<Category> = [];
        const categorys = await this.connection('category').select('*');
        console.log(categorys);
        for(let category of categorys) {
            const nome = category.nome;
            const categoryId = category.categoria_id;
            categoryCollection.push(Category.create(nome, categoryId));
        }
        return categoryCollection;
    }
}