import express, { Request, Response } from 'express'
import { configDotenv } from 'dotenv';
import swaggerjsdoc from "swagger-jsdoc"
import swaggerui from 'swagger-ui-express'
import { router } from './routes/index';
import YAML from 'yamljs'

const swaggerDocument = YAML.load('./src/swagger.yaml');
const app = express()
app.use(express.json())

app.use("/api-docs",swaggerui.serve,swaggerui.setup(swaggerDocument))
app.use(router);

app.use("/", (req: Request,res: Response) => {
    return res.send({
        "200" : "Build Done"
    })
})

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



