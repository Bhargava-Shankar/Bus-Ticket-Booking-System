import myClient from "../utils/dataSource"
import { userLoginCredentials, userRegisterCredentials } from "../interfaces"
import { hashPassword,comparePassword } from "../utils/crypt";
import { AuthRepository } from "../repository/authRepository";
import { generateAccessToken } from "../utils/jwt";
import { AppError } from "../utils/responseFormat";
import { StatusCodes } from "http-status-codes";
import { BlackListTokenRepository } from "../repository/blackListTokenRepository";

export class AuthService{

    async userRegisterService(data: userRegisterCredentials) {
        const {username,email,password} = data
        const hashedPassword = hashPassword(password);
        const authRepository = new AuthRepository()
        try {
            await authRepository.createUser({
                username: data.username,
                email: data.email,
                password: hashedPassword
            })
        }
        catch (e) {
            if (e instanceof AppError) {
                throw e
            }
            throw new AppError("Internal Server Error",StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async userLoginService(data: userLoginCredentials) {
        const authRepository = new AuthRepository()
        const { email, password } = data
        let isUser;
        try {
            isUser = await authRepository.findUniqueUser(email)
        }
        catch (e) {
            throw e
            //throw new AppError("Internal Server error",StatusCodes.INTERNAL_SERVER_ERROR)
        }
        //EMAIL NOT FOUND - USER NOT REGISTERED
        if (!isUser) {
            throw new AppError("Email Not Registered",StatusCodes.UNAUTHORIZED)
        }
        //COMPARE PASSWORD
        const loginValid = comparePassword(password, isUser.password)
        if (loginValid) {
            //GENERATE ACCESS TOKEN
            const accessToken = generateAccessToken(isUser!.userId);
            return accessToken;
        }
        throw new AppError("Password is Invalid",StatusCodes.UNAUTHORIZED)

    }

    async userLogoutService(headers: any) {
        const token: string = headers['authorization']?.substring(7)!;
        const tokenRepository = new BlackListTokenRepository()
        try {
            return await tokenRepository.addToken(token)
        }
        catch (e) {
            throw e
        }
    }
}