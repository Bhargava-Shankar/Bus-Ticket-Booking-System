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
exports.checkIfPresentInDB = exports.invalidateToken = exports.decodeToken = exports.checkAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dataSource_1 = __importDefault(require("./dataSource"));
const responseFormat_1 = require("./responseFormat");
const http_status_codes_1 = require("http-status-codes");
const db = dataSource_1.default.getInstance();
function generateAccessToken(userId) {
    const secret = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({
        userId: userId
    }, secret, {
        expiresIn: '24h',
    });
}
exports.generateAccessToken = generateAccessToken;
function checkAccessToken(token) {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return true;
    }
    catch (err) {
        // err
        return false;
    }
}
exports.checkAccessToken = checkAccessToken;
function decodeToken(token) {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (err) {
        return false;
    }
}
exports.decodeToken = decodeToken;
const invalidateToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(token);
});
exports.invalidateToken = invalidateToken;
const checkIfPresentInDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield db.blackListTokens.findFirst({
            where: {
                token: token
            }
        });
        console.log(query);
        if (query == null) {
            return false;
        }
        return true;
    }
    catch (e) {
        new responseFormat_1.AppError("You are Already Logged Out", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
});
exports.checkIfPresentInDB = checkIfPresentInDB;
//# sourceMappingURL=jwt.js.map