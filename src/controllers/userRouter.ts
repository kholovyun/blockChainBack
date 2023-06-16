import express, { Router, Response, Request } from "express";
import { auth } from "../midlewares/authorization";
import { usersService, UsersService } from "../services/usersService";

export class UsersRouter {
    router : Router
    service: UsersService
    constructor(){
        this.router = express.Router()
        this.service = usersService
        this.router.post('/users', this.createUser)
        this.router.post('/users/sessions', this.login)
        this.router.get('/users/token', auth , this.checkToken)
    }
    
    getRouter =() => {
        return this.router
    }

    login = async(req: Request, res: Response):Promise<void> => {
        const userInfo = req.body
        if(!userInfo.username || !userInfo.password){
            const resp = [{error: "Wrong input"}]
            res.send(resp)
            return
        } else {
            const resp = await this.service.login(userInfo)
            res.send(resp) 
        }
    }
    createUser = async(req: Request, res: Response):Promise<void> => {
        const newUser = req.body
        if(!newUser.username || !newUser.password){
            const resp = [{error: "Wrong input"}]
            res.send(resp)
        } else {
        const resp = await this.service.createUser(newUser)
        res.send(resp)

        }
        
    }
    public checkToken = async (expressReq: Request, res: Response): Promise<void> => {   
        const req = expressReq as any
        const response = {
            data: req.dataFromToken as any,
            message: 'Token is ok'
        }
        res.status(200).send(response)
    }

}

export const userRouter = new UsersRouter()
