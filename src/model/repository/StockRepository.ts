import { Stock } from "../Stock";
import { Uuid } from "../Uuid";

export interface StockRepository {
    save(stock: Stock): Promise<void>
    getAll(): Promise<Array<Stock>>
    getById(id: Uuid): Promise<Stock>
}