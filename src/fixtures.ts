import mongoose from "mongoose";
import { SomeData } from "./models/someData";

mongoose.connect('mongodb://127.0.0.1:27017/blockChain' || '')

const db = mongoose.connection

db.once('open', async() => {
    try {
        await db.dropCollection('users')
        await db.dropCollection('somedatas')
    } catch (error) {
        console.log(error)
    }

    await SomeData.create(
        {
            name: 'productOne',
            price: 13.77,
        },
        {
            name: 'productTwo',
            price: 5.17,
        },
        {
            name: 'productThree',
            price: 133.77,
        },
        {
            name: 'productFour',
            price: 0.772,
        },
        {
            name: 'productFive',
            price: 132.727,
        }, 

    )
    console.log("FIXTURES CREATED")


 
    db.close()
})