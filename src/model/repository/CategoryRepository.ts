import { Category } from "../Category";
import { Uuid } from "../Uuid";

export interface CategoryRepository {
    save(category: Category): Promise<void>
    getAll(): Promise<Array<Category>>
    getById(id: Uuid): Promise<Category>
    remove(id: Uuid): Promise<void>
}