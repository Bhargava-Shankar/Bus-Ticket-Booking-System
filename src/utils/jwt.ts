import { truncate } from "fs";
import jwt from "jsonwebtoken";
import myClient from "./dataSource";
import { AppError } from "./responseFormat";
import { StatusCodes } from "http-status-codes";

const db = myClient.getInstance()

export function generateAccessToken(userId: string) {
    const secret = process.env.JWT_SECRET!;
    return jwt.sign({
        userId: userId
    }, secret ,{
        expiresIn: '24h',
        
    })
}

export function checkAccessToken(token: string) {
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return true;
    } catch (err) {
        // err
        return false;
    }
}

export function decodeToken(token: string)
{
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded
    }
    catch (err) {
        return false
    }
}

export const invalidateToken = async (token: string) => {
  
}

export const checkIfPresentInDB = async (token: string) => {
    try {
        const query = await db.blackListTokens.findFirst({
            where: {
                token : token
            }
        })
        if (query == null) {
            return false
        }
        return true
    }
    catch (e) {
        new AppError("You are Already Logged Out", StatusCodes.BAD_REQUEST)
    }
}