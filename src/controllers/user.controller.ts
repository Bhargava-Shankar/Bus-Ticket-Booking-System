import {  Request, Response } from "express"
import { successResponse, errorResponse } from "../utils/responseFormat";
import { StatusCodes } from "http-status-codes";
import myClient from "../utils/dataSource";
import { AppError } from "../utils/responseFormat";
import { AuthService } from "../service/authService";
import { BusService } from "../service/busService";
import getAllBusRequest from "../interfaces";

const db = myClient.getInstance()
export const userRegisterController = async (req: Request, res: Response) => {
    const authService = new AuthService();
    try {
        await authService.userRegisterService(req.body)
        successResponse.message = { "msg": "Registration Successfull" }
        return res.status(StatusCodes.ACCEPTED).json(successResponse);
    }
    catch (e) {
        if (e instanceof AppError) {
            errorResponse.message = e.message
            return res.status(e.statusCode).json(errorResponse)
        }
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse)
    }
}

export const userLoginController = async (req: Request, res: Response) => {
    const authService = new AuthService()
    try {
        const accessToken = await authService.userLoginService(req.body)
        successResponse.data = {"token" : accessToken}
        return res.status(StatusCodes.OK).json(successResponse);
    }
    catch (e) {
        if (e instanceof AppError) {
            errorResponse.message = e.message;
            return res.status(e.statusCode).json(errorResponse)
        }
        res.status(StatusCodes.BAD_REQUEST).json(e);
    }
}

export const getAllBusController = async(req: Request, res: Response) => {
    const busService = new BusService()
    const data: any = req.query
    console.log(data)
    try {
        const busDetails = await busService.getAllBusService(data)
        successResponse.data = busDetails
        if (busDetails.length === 0) {
            successResponse.message = "No Buses Found"
        }
        return res.status(StatusCodes.OK).json(successResponse)
    }
    catch (e) {
        if (e instanceof AppError) {
            errorResponse.message = e.message
            return res.status(e.statusCode).json(errorResponse);
        }
    }
    
}

export const searchBusController = async (req: Request, res: Response) => {

    const busService = new BusService()
    const data:any = req.query
    try {
        const busDetails = await busService.getAllBusService(data)
        successResponse.data = busDetails
        if (busDetails.length === 0) {
            successResponse.message = "No Buses Found"
        }
        return res.status(StatusCodes.ACCEPTED).json(successResponse)
    }
    catch (e) {
        if (e instanceof AppError) {
            errorResponse.message = e.message
            return res.status(e.statusCode).json(errorResponse);
        }
    }
    
}


export const bookBusController = async(req: Request, res: Response) => {
    //SEARCH IF THE SEAT NUMBER AND BUS ID COMBINATION IS UNIQUE OR NOT : DONE
    //BOOKING HAPPENDS AS A WHOLE TRANSACTION OR NONE OF IT GETS EXECUTED
    const busService = new BusService();
    try {
        const bookingDetails = await busService.bookBusService(req.body)
        successResponse.data = bookingDetails
        successResponse.message = {
            "msg" : "Booking Successfull"
        }
        return res.status(StatusCodes.ACCEPTED).send(successResponse)
    }
    catch (e) {
        errorResponse.message = { "msg": "ERROR BOOKING YOUR SEAT" }
        res.status(StatusCodes.CONFLICT).send(errorResponse)
        
    }
}

export const logoutController = async (req: Request, res: Response) => {
    try {
        const authService = new AuthService()
        await authService.userLogoutService(req.headers)
        successResponse.message = { "msg": "LOG OUT SUCCESSFULL" }
        successResponse.data = {}
        res.status(StatusCodes.OK).send(successResponse)
    }
    catch (e)
    {
        errorResponse.message = {
            "msg" : "YOU ARE ALREADY LOGGED OUT"
        }
        res.status(StatusCodes.UNAUTHORIZED).send(errorResponse)
    }
    
}
