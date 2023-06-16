import { Document } from "mongoose"

export default interface ISomeData extends Document{
    name : string
    price: Number 
}