import { Document } from "mongoose"

export default interface IUser extends Document {
    _id: string
    username: string
    password: string
    token?: string
}