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
const jwt_1 = require("../utils/jwt");
const http_status_codes_1 = require("http-status-codes");
const responseFormat_1 = require("../utils/responseFormat");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.substring(7);
        if (!token) {
            throw new responseFormat_1.AppError("JWT TOKEN NOT AVAILABLE", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const ifPresentInDb = yield (0, jwt_1.checkIfPresentInDB)(token);
        if ((0, jwt_1.checkAccessToken)(token) && !ifPresentInDb) {
            const tokenData = (0, jwt_1.decodeToken)(token);
            req.body.userId = tokenData['userId'];
            req.body.token = token;
            next();
        }
        else {
            throw new responseFormat_1.AppError("JWT TOKEN IS NOT VALID", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
    }
    catch (e) {
        if (e instanceof responseFormat_1.AppError) {
            responseFormat_1.errorResponse.message = e.message;
        }
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(responseFormat_1.errorResponse);
    }
});
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map