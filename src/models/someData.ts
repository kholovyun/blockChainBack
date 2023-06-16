import mongoose, { Schema } from "mongoose";
import ISomeData from "../interfaces/ISomeData";

const SomeDataSchrem: Schema = new Schema<ISomeData>({
    name : {
        type: String,
        requared: true
    },
    price : {
        type: Number,
        requared: true
    }
})

export const SomeData = mongoose.model<ISomeData>('somedatas', SomeDataSchrem)