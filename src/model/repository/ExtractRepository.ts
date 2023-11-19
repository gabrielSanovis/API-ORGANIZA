import { Extract } from "../Extract";

export interface ExtractRepository {
    save(extract: Extract): Promise<void>
    // getAll(): Promise<Extract[]>
}