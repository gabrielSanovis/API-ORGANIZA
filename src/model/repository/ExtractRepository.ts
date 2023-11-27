import { Extract } from "../Extract";

export interface ExtractRepository {
    save(extract: Extract, categoryID: string): Promise<void>
    getAll(): Promise<Extract[]>
    saveRelationshipBetweenExtractCategory(extractID: string, categoryID: string)
}