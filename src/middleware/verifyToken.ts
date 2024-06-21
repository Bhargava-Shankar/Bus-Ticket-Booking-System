import { NextFunction,Request,Response } from "express";
import { checkAccessToken, decodeToken } from "../utils/jwt";
import { StatusCodes } from "http-status-codes";
import { AppError, errorResponse } from "../utils/responseFormat";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const token = req.headers['authorization']?.substring(7);
        if (!token) {
            throw new AppError("JWT TOKEN NOT AVAILABLE", StatusCodes.UNAUTHORIZED)
        }
        if (checkAccessToken(token)) {
            const tokenData: any = decodeToken(token)
            req.body.userId = tokenData['userId']
            next()
        }
        else {
            throw new AppError("JWT TOKEN IS NOT VALID", StatusCodes.UNAUTHORIZED)
        }
    }
    catch (e) {
        if (e instanceof AppError) {
            errorResponse.message = e.message;
        }
        res.status(StatusCodes.BAD_REQUEST).send(errorResponse)
    }
   
   
  
}

export default verifyToken;