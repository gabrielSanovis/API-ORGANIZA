import { User } from "../User";
import { Uuid } from "../Uuid";

export interface UserRepository {
    save(user: User): Promise<void>
    getAll(): Promise<Array<User>>
    getById(email: string): Promise<User>
    remove(id: Uuid): Promise<void>
}