import { Router, Request, Response } from "express"
import { userLoginController, userRegisterController } from "../controllers/user.controller";
// import dummyDB from "../jsonDB/dummyData.json";
import { getAllBusController,searchBusController } from "../controllers/user.controller";


const userRouter = Router()

//TODO EMAIL VALIDATION AND ERROR MANAGEMENT
userRouter.post("/register", userRegisterController);

userRouter.post("/login", userLoginController)

//GET ALL BUSES
userRouter.get("/bus", getAllBusController)

//SEARCH FOR BUSES
userRouter.get("/search", searchBusController)



export default userRouter;