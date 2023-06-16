import { Document } from "mongoose"
import IUser from "./IUser"

export default interface IUserTokenDTO extends Document {
    _id: IUser['_id']
    username: IUser["username"]
    token: string
}