"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.bookBusController = exports.searchBusController = exports.getAllBusController = exports.userLoginController = exports.userRegisterController = void 0;
const responseFormat_1 = require("../utils/responseFormat");
const http_status_codes_1 = require("http-status-codes");
const dataSource_1 = __importDefault(require("../utils/dataSource"));
const responseFormat_2 = require("../utils/responseFormat");
const authService_1 = require("../service/authService");
const busService_1 = require("../service/busService");
const db = dataSource_1.default.getInstance();
const userRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authService = new authService_1.AuthService();
    try {
        yield authService.userRegisterService(req.body);
        responseFormat_1.successResponse.message = { "msg": "Registration Successfull" };
        return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(responseFormat_1.successResponse);
    }
    catch (e) {
        if (e instanceof responseFormat_2.AppError) {
            responseFormat_1.errorResponse.message = e.message;
            return res.status(e.statusCode).json(responseFormat_1.errorResponse);
        }
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(responseFormat_1.errorResponse);
    }
});
exports.userRegisterController = userRegisterController;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authService = new authService_1.AuthService();
    try {
        const accessToken = yield authService.userLoginService(req.body);
        responseFormat_1.successResponse.data = { "token": accessToken };
        return res.status(http_status_codes_1.StatusCodes.OK).json(responseFormat_1.successResponse);
    }
    catch (e) {
        if (e instanceof responseFormat_2.AppError) {
            responseFormat_1.errorResponse.message = e.message;
            return res.status(e.statusCode).json(responseFormat_1.errorResponse);
        }
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(e);
    }
});
exports.userLoginController = userLoginController;
const getAllBusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busService = new busService_1.BusService();
    try {
        const busDetails = yield busService.getAllBusService(req.body);
        responseFormat_1.successResponse.data = busDetails;
        if (busDetails.length === 0) {
            responseFormat_1.successResponse.message = "No Buses Found";
        }
        return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(responseFormat_1.successResponse);
    }
    catch (e) {
        if (e instanceof responseFormat_2.AppError) {
            responseFormat_1.errorResponse.message = e.message;
            return res.status(e.statusCode).json(responseFormat_1.errorResponse);
        }
    }
});
exports.getAllBusController = getAllBusController;
const searchBusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busService = new busService_1.BusService();
    try {
        const busDetails = yield busService.getAllBusService(req.body);
        responseFormat_1.successResponse.data = busDetails;
        if (busDetails.length === 0) {
            responseFormat_1.successResponse.message = "No Buses Found";
        }
        return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(responseFormat_1.successResponse);
    }
    catch (e) {
        if (e instanceof responseFormat_2.AppError) {
            responseFormat_1.errorResponse.message = e.message;
            return res.status(e.statusCode).json(responseFormat_1.errorResponse);
        }
    }
});
exports.searchBusController = searchBusController;
const bookBusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //SEARCH IF THE SEAT NUMBER AND BUS ID COMBINATION IS UNIQUE OR NOT : DONE
    //BOOKING HAPPENDS AS A WHOLE TRANSACTION OR NONE OF IT GETS EXECUTED
    const busService = new busService_1.BusService();
    try {
        const bookingDetails = yield busService.bookBusService(req.body);
        responseFormat_1.successResponse.data = bookingDetails;
        responseFormat_1.successResponse.message = {
            "msg": "Booking Successfull"
        };
        return res.status(http_status_codes_1.StatusCodes.ACCEPTED).send(responseFormat_1.successResponse);
    }
    catch (e) {
        responseFormat_1.errorResponse.message = { "msg": "ERROR BOOKING YOUR SEAT" };
        res.status(http_status_codes_1.StatusCodes.CONFLICT).send(responseFormat_1.errorResponse);
    }
});
exports.bookBusController = bookBusController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authService = new authService_1.AuthService();
        yield authService.userLogoutService(req.headers);
        responseFormat_1.successResponse.message = { "msg": "LOG OUT SUCCESSFULL" };
        responseFormat_1.successResponse.data = {};
        res.status(http_status_codes_1.StatusCodes.OK).send(responseFormat_1.successResponse);
    }
    catch (e) {
        responseFormat_1.errorResponse.message = {
            "msg": "YOU ARE ALREADY LOGGED OUT"
        };
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send(responseFormat_1.errorResponse);
    }
});
exports.logoutController = logoutController;
//# sourceMappingURL=user.controller.js.map