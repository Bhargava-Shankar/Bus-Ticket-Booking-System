import express, { Request, Response } from 'express'
import { configDotenv } from 'dotenv';
import { router } from './routes/index';


const app = express()
app.use(express.json())
app.use(router);

//FROM PLACE TO PLACE
//AC NON AC SLEEPER SEMI SLEEPER
//SEAT NUMBER CODE
//TICKET PRICE BASED ON SEAT
//CONFIRMATION BOOK

//SIGNUP AND LOGIN

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})



