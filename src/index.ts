import express, { Request, Response } from 'express'
import "dotenv/config"
import swaggerui from 'swagger-ui-express'
import path from 'path';
import { router } from './routes/index';
import YAML from 'yamljs'

const swaggerDocument = YAML.load(path.join(__dirname, '/swagger.yaml'));
const app = express()
app.use(express.json())
app.use("/api-docs",swaggerui.serve,swaggerui.setup(swaggerDocument))
app.use(router);
app.use("/", (req: Request,res: Response) => {
    return res.send({
        "200" : "Build Done"
    })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})



