import { NextFunction,Request,Response } from "express";
import { checkAccessToken, checkIfPresentInDB, decodeToken } from "../utils/jwt";
import { StatusCodes } from "http-status-codes";
import { AppError, errorResponse } from "../utils/responseFormat";

const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
    
    try {
        const token = req.headers['authorization']?.substring(7);
        if (!token) {
            throw new AppError("JWT TOKEN NOT AVAILABLE", StatusCodes.UNAUTHORIZED)
        }
        const ifPresentInDb: boolean | undefined = await checkIfPresentInDB(token);
        if (checkAccessToken(token) && !ifPresentInDb ) {
            const tokenData: any = decodeToken(token)
            req.body.userId = tokenData['userId']
            req.body.token = token
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