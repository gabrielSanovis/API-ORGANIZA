import { Stock } from "../Stock";

export interface StockRepository {
    save(stock: Stock): Promise<void>
    getAll(): Promise<Array<Stock>>
}