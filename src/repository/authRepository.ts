import myClient from "../utils/dataSource";
import {getAllBusRequest, userRegisterCredentials} from "../interfaces"
import { AppError } from "../utils/responseFormat";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";

const prisma = myClient.getInstance()

export class AuthRepository{
    model: Prisma.UserDelegate;
    constructor() {
        this.model = prisma.user;
    }

    async createUser(data: userRegisterCredentials) {
        try {
            return await this.model.create({
                data: data
            })
        }
        catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                throw new AppError("Email Already Exists",StatusCodes.BAD_REQUEST)
            }
        }
    }

    async findUniqueUser(email: string) {
        try {
            return await this.model.findUnique({
                where: {
                    email : email
                }
            })
        }
        catch (e) {
            throw new AppError("Internal Server Error",StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

  
}