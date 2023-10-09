import { Request, Response, Router } from "express";
import { UserCreate } from "./controller/UserCreate";
import { UserList } from "./controller/UserList";
import { UserRepositoryDatabase } from "./infra/repository/database/UserRepositoryDatabase";

const router = Router()

const repository = new UserRepositoryDatabase()
const userCreate = new UserCreate(repository)
const userList = new UserList(repository)

router.post('/user', (req: Request, res: Response) => {
    userCreate.execute(req, res)
})

router.get('/user', (req: Request, res: Response) => {
    userList.execute(req, res)
})

export { router }