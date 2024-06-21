import express, { Request, Response } from 'express'
import { configDotenv } from 'dotenv';
import swaggerjsdoc from "swagger-jsdoc"
import swaggerui from 'swagger-ui-express'
import { router } from './routes/index';


const options = {
    definition: {
        openapi: "3.0.0",
         info: {
            title: 'Hello World',
            version: '1.0.0',
            },
        servers: [
            {
                url : "http://localhost:3000/"
            },
        ],
    },
    apis : ["./src/routes/user.route.ts"]
}

const spacs = swaggerjsdoc(options)

const app = express()
app.use(express.json())
app.use("/api-docs",swaggerui.serve,swaggerui.setup(spacs))
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



