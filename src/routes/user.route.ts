/**
 * @openapi
 * /healthCheck:
 *   get:
 *     summary: Greet the user
 *     description: Returns a greeting message
 *     responses:
 *       '200':
 *         description: A greeting message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, world!"
 */


import { Router, Request, Response } from "express"
import { bookBusController, userLoginController, userRegisterController } from "../controllers/user.controller";
// import dummyDB from "../jsonDB/dummyData.json";
import { getAllBusController,searchBusController } from "../controllers/user.controller";
import { verify } from "crypto";
import verifyToken from "../middleware/verifyToken";



const userRouter = Router()

userRouter.post("/register", userRegisterController);

userRouter.post("/login", userLoginController)

//GET ALL BUSES
userRouter.get("/bus", verifyToken ,getAllBusController)

//SEARCH FOR BUSES
userRouter.get("/search", verifyToken, searchBusController)

//BOOK SEATS IN BUS
userRouter.post("/book",verifyToken,bookBusController)



export default userRouter;