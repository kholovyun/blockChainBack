import IUserDTO from "../interfaces/IUserDTO"
import MongoDB, { mongoDB } from "../repositories/mongoDB"

export class UsersService {
    private db: MongoDB
    constructor(){
        this.db = mongoDB
    }
    public login = async(userInfo : IUserDTO) => {
        const resp = await this.db.login(userInfo)
        return resp
    }
    public createUser = async(userInfo : IUserDTO) => {
        const resp = await this.db.cteateUser(userInfo)
        return resp
    }
}

export const usersService = new UsersService()