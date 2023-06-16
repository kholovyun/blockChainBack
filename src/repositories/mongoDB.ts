import dotenv from "dotenv"
import mongoose, { Mongoose } from "mongoose"
import IUserDTO from "../interfaces/IUserDTO"
import { Users } from "../models/user"
import bcrypt from 'bcrypt'
import { generateJWT } from "../helpers/generateJWT"
import IResponse from "../interfaces/IResponse"
import IUserTokenDTO from "../interfaces/IUserTokenDTO"
dotenv.config()

export default class MongoDB {
    public client: Mongoose | null = null

    public close = async(): Promise<void> => {
          await mongoose.disconnect()
    } 

    public init = async():  Promise<void> => {
        try {
            this.client = await mongoose.connect(`mongodb+srv://yunus:edo515@cluster0.en8nhb8.mongodb.net/`);
            console.log('Mongo is connected successfully')
        } catch (error) {
            console.log(error)
        }
    }
    public login = async(userInfo: IUserDTO): Promise<IResponse<IUserTokenDTO | undefined>> => {
        try {
            const user = await Users.findOne({username: userInfo.username});
            if (!user) {     
                throw new Error('Not found')
              }
            const isMatch = await bcrypt.compare(userInfo.password, user.password);
            if (!isMatch) {
                throw new Error('Wrong password')
            }
            const data = {
                _id: user._id,
                username: user.username,
                token: generateJWT({_id: user._id, username: user.username}, '30 day')
            } as IUserTokenDTO
            await user.save()
            const resp: IResponse<IUserTokenDTO> = {
                data : data,
                message: 'Accepted'
            }
            return resp
        } 
        catch (error) {
            const err = error as Error
            const resp: IResponse<undefined> = {
                data : undefined,
                message: err.message
            }
            return resp
        }
    }
   
    public cteateUser = async(user: IUserDTO): Promise<IResponse<IUserTokenDTO | undefined>> => {
        try {
            const exists = await Users.exists({username: user.username})
            if (exists) {
                const resp: IResponse<undefined> = {
                    data: undefined,
                    message: '[ERROR] User already registered'
                }
               return resp
            }
            const newUser = new Users({...user, role: 'USER'})
            await newUser.save()
            const data = {
                _id: newUser._id,
                username : newUser.username,
                token: generateJWT({_id: newUser._id, username: newUser.username}, '24h')
            } as IUserTokenDTO
            const resp: IResponse<IUserTokenDTO> = {
                data: data,
                message: 'User created'
            }
            return  resp
        } 
        catch (error) {
            const err = error as Error
            const resp: IResponse<undefined> = {
                data : undefined,
                message: err.message
            }
            return resp
        }
    }
}

export const  mongoDB = new MongoDB()