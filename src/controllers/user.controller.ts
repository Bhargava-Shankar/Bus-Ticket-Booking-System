import {  Request, Response } from "express"
import { comparePassword, hashPassword } from "../utils/crypt"
import { generateAccessToken } from "../utils/jwt";
import { successResponse, errorResponse } from "../utils/responseFormat";
import { StatusCodes } from "http-status-codes";
import myClient from "../utils/dataSource";
import { AppError } from "../utils/responseFormat";
import data from "../jsonDB/dummyData"
import { BusConditioningType } from "@prisma/client";
import { gteDate,ltDate } from "../utils/date";


const db = myClient.getInstance()
export const userRegisterController =
    async (req: Request, res: Response) => {

    const hashedPassword = hashPassword(req.body.password);
    try {
        const query = await db.user.create({
        data: {
            username : req.body.username,
            password: hashedPassword,
            email : req.body.email
        }
        })
        //GENERATE ACCESS TOKEN
        const accessToken = generateAccessToken(query.userId);
        successResponse.message = {
            "msg" : "Registration Successfull!"
        }
        res.status(StatusCodes.ACCEPTED).json(successResponse);
    }
    catch (e) {
        errorResponse.message = e;
        res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    }

export const userLoginController = async (req: Request, res: Response) => {
    try {
        let isUser = await db.user.findUnique({
            where: {
                email: req.body.email
            }
        })
        if (!isUser) {
            //CHECK FOR PASSWORD
            
             throw new AppError("User Not Found",StatusCodes.BAD_REQUEST)
        }
        let loginValid = comparePassword(req.body.password, isUser!.password)
        if (loginValid) {
            const accessToken = generateAccessToken(isUser!.userId);
            successResponse.data = {
            "token" : accessToken
            }
            res.status(StatusCodes.ACCEPTED).json(successResponse);
            return;
        }
        throw new AppError("Password is inValid",StatusCodes.BAD_REQUEST)
      
        
    }
    catch (e) {
        if (e instanceof AppError) {
            errorResponse.message = e.message;
        }
        res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
}

export const getAllBusController = async(req: Request, res: Response) => {

    const { source, destination,departureDate } = req.body;
    try {
        const query = await db.bus.findMany({
                where: {
                    source: source,
                    destination: destination,
                    departureTime: (departureDate) ? {
                        gte: gteDate(departureDate),
                        lt: ltDate(departureDate)
                    }: undefined
                }
        })
        console.log(query)
        res.send(query);
    }
    catch (e) {
        res.send(e);
    }
    
}


export const searchBusController = async (req: Request, res: Response) => {

    const { source, destination, departureDate, travelsName } =
        req.body;

    console.log(source)
    console.log(departureDate)
    try {
            const query = await db.bus.findMany({
                where: {
                    travelsName: travelsName,
                    source: source,
                    destination: destination,
                    departureTime: (departureDate) ? {
                        gte: gteDate(departureDate),
                        lt: ltDate(departureDate)
                    }: undefined
                },
            })
        
        //QUERY IF DEPARTURE DATE IS AVAILABLE
  
        res.send(query);
    }
    catch (e) {
        res.send(e);
    }
    
}

//INSERTING DUMMY JSON DATA TO DB
    //    data.map(async (busData) => {
    //     console.log()
    //     await db.bus.create({
    //         data: busData
    //     })
    // })
    // res.send("SUCCESS")