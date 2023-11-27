import { Extract } from "../Extract";
import { Uuid } from "../Uuid";

export interface ExtractRepository {
    save(extract: Extract, categoryID: string): Promise<void>
    getAll(): Promise<Extract[]>
    saveRelationshipBetweenExtractCategory(extractID: string, categoryID: string)
    getById(id: Uuid): Promise<Extract>
    remove(id: Uuid): Promise<void>
}