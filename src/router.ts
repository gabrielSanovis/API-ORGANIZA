import { Request, Response, Router } from "express";
import { UserCreate } from "./controller/UserCreate";
import { UserList } from "./controller/UserList";
import { UserRepositoryDatabase } from "./infra/repository/database/UserRepositoryDatabase";
import { StockCreate } from "./controller/StockCreate";
import { StockRepositoryDatabase } from "./infra/repository/database/StockRepositoryDatabase";
import { StockList } from "./controller/StockList";
import { NotificationRepositoryDatabase } from "./infra/repository/database/NotifcationRepositoryDatabase";
import { NotificationCreate } from "./controller/NotificationCreate";
import { NotificationList } from "./controller/NotificationList";
import { CategoryRepositoryDatabase } from "./infra/repository/database/CategoryRepositoryDatabase";
import { CategoryCreate } from "./controller/CategoryCreate";
import { CategoryList } from "./controller/CategoryList";

const router = Router();
// DATABASE
const repository = new UserRepositoryDatabase();
const stockRepository = new StockRepositoryDatabase();
const notificationRepository = new NotificationRepositoryDatabase();
const categoryRepository = new CategoryRepositoryDatabase();

const userCreate = new UserCreate(repository);
const userList = new UserList(repository);

const stockCreate = new StockCreate(stockRepository);
const stockList = new StockList(stockRepository);

const notificationCreate = new NotificationCreate(notificationRepository);
const notificationList = new NotificationList(notificationRepository);

const categoryCreate = new CategoryCreate(categoryRepository);
const categoryList = new CategoryList(categoryRepository);

router.post('/user', (req: Request, res: Response) => {
    userCreate.execute(req, res)
})

router.get('/user', (req: Request, res: Response) => {
    userList.execute(req, res)
})

// STOCK
router.post('/stock', (req: Request, res: Response) => {
    stockCreate.execute(req, res)
})

router.get('/stock', (req: Request, res: Response) => {
    stockList.execute(req, res);
})

// NOTIFICATION

router.post('/notification', (req: Request, res: Response) => {
    notificationCreate.execute(req, res)
})

router.get('/notification', (req: Request, res: Response) => {
    notificationList.execute(req, res);
})

// CATEGORY 
router.post('/category', (req: Request, res: Response) => {
    categoryCreate.execute(req, res)
})

router.get('/category', (req: Request, res: Response) => {
    categoryList.execute(req, res)
})

export { router }