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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const crypt_1 = require("../utils/crypt");
const authRepository_1 = require("../repository/authRepository");
const jwt_1 = require("../utils/jwt");
const responseFormat_1 = require("../utils/responseFormat");
const http_status_codes_1 = require("http-status-codes");
const blackListTokenRepository_1 = require("../repository/blackListTokenRepository");
class AuthService {
    userRegisterService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = data;
            const hashedPassword = (0, crypt_1.hashPassword)(password);
            const authRepository = new authRepository_1.AuthRepository();
            try {
                yield authRepository.createUser({
                    username: data.username,
                    email: data.email,
                    password: hashedPassword
                });
            }
            catch (e) {
                if (e instanceof responseFormat_1.AppError) {
                    throw e;
                }
                throw new responseFormat_1.AppError("Internal Server Error", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    userLoginService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const authRepository = new authRepository_1.AuthRepository();
            const { email, password } = data;
            let isUser;
            try {
                isUser = yield authRepository.findUniqueUser(email);
            }
            catch (e) {
                throw new responseFormat_1.AppError("Internal Server error", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
            //EMAIL NOT FOUND - USER NOT REGISTERED
            if (!isUser) {
                throw new responseFormat_1.AppError("Email Not Registered", http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            //COMPARE PASSWORD
            const loginValid = (0, crypt_1.comparePassword)(password, isUser.password);
            if (loginValid) {
                //GENERATE ACCESS TOKEN
                const accessToken = (0, jwt_1.generateAccessToken)(isUser.userId);
                return accessToken;
            }
            throw new responseFormat_1.AppError("Password is Invalid", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        });
    }
    userLogoutService(headers) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const token = (_a = headers['authorization']) === null || _a === void 0 ? void 0 : _a.substring(7);
            const tokenRepository = new blackListTokenRepository_1.BlackListTokenRepository();
            try {
                return yield tokenRepository.addToken(token);
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map