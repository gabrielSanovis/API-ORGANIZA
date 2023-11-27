import { Request, Response, Router } from "express";
import { UserCreate } from "./controller/UserCreate";
import { UserList } from "./controller/UserList";
import { UserGetById } from "./controller/UserGetById";
import { UserRemoveById } from "./controller/UserRemoveById";
import { UserRepositoryDatabase } from "./infra/repository/database/UserRepositoryDatabase";
import { StockRepositoryDatabase } from "./infra/repository/database/StockRepositoryDatabase";
import { StockCreate } from "./controller/StockCreate";
import { StockList } from "./controller/StockList";
import { StockGetById } from "./controller/StockGetById";
import { NotificationRepositoryDatabase } from "./infra/repository/database/NotifcationRepositoryDatabase";
import { NotificationCreate } from "./controller/NotificationCreate";
import { NotificationList } from "./controller/NotificationList";
import { NotificationGetById } from "./controller/NotificationGetById";
import { CategoryRepositoryDatabase } from "./infra/repository/database/CategoryRepositoryDatabase";
import { CategoryCreate } from "./controller/CategoryCreate";
import { CategoryList } from "./controller/CategoryList";
import { CategoryGetById } from "./controller/CategoryGetById";
import { ExtractRepositoryDatabase } from "./infra/repository/database/ExtractRepositoryDatabase";
import { ExtractCreate } from "./controller/ExtractCreate";
import { ExtractList } from "./controller/ExtractList";
import { ExtractGetById } from "./controller/ExtractGetById";
import { CategoryRemoveById } from "./controller/CategoryRemoveById";
import { ExtractRemoveById } from "./controller/ExtractRemoveById";
import { NotificationRemoveById } from "./controller/NotificationRemoveById";
import { StockRemoveById } from "./controller/StockRemoveById";

const router = Router();
// DATABASE
const repository = new UserRepositoryDatabase();
const stockRepository = new StockRepositoryDatabase();
const notificationRepository = new NotificationRepositoryDatabase();
const categoryRepository = new CategoryRepositoryDatabase();
const extractRepository = new ExtractRepositoryDatabase();

const userCreate = new UserCreate(repository);
const userList = new UserList(repository);
const userGetById = new UserGetById(repository);
const useRemoveById = new UserRemoveById(repository);

const stockCreate = new StockCreate(stockRepository);
const stockList = new StockList(stockRepository);
const stockGetById = new StockGetById(stockRepository);
const stockRemoveById = new StockRemoveById(stockRepository);

const notificationCreate = new NotificationCreate(notificationRepository);
const notificationList = new NotificationList(notificationRepository);
const notificationGetById = new NotificationGetById(notificationRepository);
const notificationRemoveById = new NotificationRemoveById(notificationRepository);

const categoryCreate = new CategoryCreate(categoryRepository);
const categoryList = new CategoryList(categoryRepository);
const categoryGetById = new CategoryGetById(categoryRepository);
const categoryRemoveById = new CategoryRemoveById(categoryRepository);

const extractCreate = new ExtractCreate(extractRepository);
const extractList = new ExtractList(extractRepository);
const extractGetById = new ExtractGetById(extractRepository);
const extractRemoveById = new ExtractRemoveById(extractRepository);

router.post('/user', (req: Request, res: Response) => {
    userCreate.execute(req, res)
})

router.get('/user', (req: Request, res: Response) => {
    userList.execute(req, res)
})

router.get('/user/:email', (req: Request, res: Response) => {
    userGetById.execute(req, res)
})

router.delete('/user/:id', (req: Request, res: Response) => {
    useRemoveById.execute(req, res)
})


// STOCK
router.post('/stock', (req: Request, res: Response) => {
    stockCreate.execute(req, res)
})

router.get('/stock', (req: Request, res: Response) => {
    stockList.execute(req, res);
})

router.get('/stock/:id', (req: Request, res: Response) => {
    stockGetById.execute(req, res);
})

router.delete('/stock/:id', (req: Request, res: Response) => {
    stockRemoveById.execute(req, res);
})

// NOTIFICATION

router.post('/notification', (req: Request, res: Response) => {
    notificationCreate.execute(req, res)
})

router.get('/notification', (req: Request, res: Response) => {
    notificationList.execute(req, res);
})

router.get('/notification/:id', (req: Request, res: Response) => {
    notificationGetById.execute(req, res);
})

router.delete('/notification/:id', (req: Request, res: Response) => {
    notificationRemoveById.execute(req, res);
})

// CATEGORY 
router.post('/category', (req: Request, res: Response) => {
    categoryCreate.execute(req, res)
})

router.get('/category', (req: Request, res: Response) => {
    categoryList.execute(req, res)
})

router.get('/category/:id', (req: Request, res: Response) => {
    categoryGetById.execute(req, res)
})

router.delete('/category/:id', (req: Request, res: Response) => {
    categoryRemoveById.execute(req, res)
})

// EXTRACT
router.post('/extract', (req: Request, res: Response) => {
    extractCreate.execute(req, res)
})

router.get('/extract', (req: Request, res: Response) => {
    extractList.execute(req, res)
})

router.get('/extract/:id', (req: Request, res: Response) => {
    extractGetById.execute(req, res)
})

router.delete('/extract/:id', (req: Request, res: Response) => {
    extractRemoveById.execute(req, res)
})

export { router }