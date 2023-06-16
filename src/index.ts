import express, { Express } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { userRouter } from "./controllers/userRouter";
import { mongoDB } from "./repositories/mongoDB";
dotenv.config()

class App {
    private app: Express
    constructor(){
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(cors())
        this.app.use('/', userRouter.getRouter())
    }

    public init = async(): Promise<void> => {
        try{
            this.app.listen(process.env.PORT || "3000", 
                () => console.log(`Server is runnig on port: ${process.env.APP_PORT}`))
            await mongoDB.init()
            process.on('exit', () => {
                mongoDB.close()
            })
        } catch(err: unknown){
            console.log(err);
        }
    }
}

const app = new App()

app.init()