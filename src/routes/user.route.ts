import { Router, Request, Response } from "express"
import { bookBusController, logoutController, userLoginController, userRegisterController } from "../controllers/user.controller";
// import dummyDB from "../jsonDB/dummyData.json";
import { getAllBusController,searchBusController } from "../controllers/user.controller";
import { verify } from "crypto";
import verifyToken from "../middleware/verifyToken";



const userRouter = Router()

userRouter.post("/register", userRegisterController);

userRouter.post("/login", userLoginController)

//GET ALL BUSES
userRouter.get("/getAllBus", verifyToken ,getAllBusController)

//SEARCH FOR BUSES
userRouter.get("/search", verifyToken, searchBusController)
//BOOK SEATS IN BUS
userRouter.post("/book", verifyToken, bookBusController)

//LOGOOUT
userRouter.post("/logout",logoutController)



export default userRouter;