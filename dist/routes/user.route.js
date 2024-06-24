"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
// import dummyDB from "../jsonDB/dummyData.json";
const user_controller_2 = require("../controllers/user.controller");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const userRouter = (0, express_1.Router)();
userRouter.post("/register", user_controller_1.userRegisterController);
userRouter.post("/login", user_controller_1.userLoginController);
//GET ALL BUSES
userRouter.get("/getAllBus", verifyToken_1.default, user_controller_2.getAllBusController);
//SEARCH FOR BUSES
userRouter.get("/search", verifyToken_1.default, user_controller_2.searchBusController);
//BOOK SEATS IN BUS
userRouter.post("/book", verifyToken_1.default, user_controller_1.bookBusController);
//LOGOOUT
userRouter.post("/logout", user_controller_1.logoutController);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map