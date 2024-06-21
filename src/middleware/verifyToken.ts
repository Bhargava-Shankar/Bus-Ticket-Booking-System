import { NextFunction,Request,Response } from "express";
import { checkAccessToken } from "../utils/jwt";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/responseFormat";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    
    try {
        console.log(req.headers);
        const token = req.cookies['jwtToken'];
       
    if (!token) {
        return false
    }
        return checkAccessToken(token)
    next()
    }
    catch (e) {
        errorResponse.message = "Invalid Token"
        res.status(StatusCodes.BAD_REQUEST).send(errorResponse)
    }
   
  
}

export default verifyToken;