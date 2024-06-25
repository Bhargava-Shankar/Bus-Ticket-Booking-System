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
exports.AuthRepository = void 0;
const dataSource_1 = __importDefault(require("../utils/dataSource"));
const responseFormat_1 = require("../utils/responseFormat");
const library_1 = require("@prisma/client/runtime/library");
const http_status_codes_1 = require("http-status-codes");
const prisma = dataSource_1.default.getInstance();
class AuthRepository {
    constructor() {
        this.model = prisma.user;
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.create({
                    data: data
                });
            }
            catch (e) {
                if (e instanceof library_1.PrismaClientKnownRequestError) {
                    throw new responseFormat_1.AppError("Email Already Exists", http_status_codes_1.StatusCodes.BAD_REQUEST);
                }
            }
        });
    }
    findUniqueUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findUnique({
                    where: {
                        email: email
                    }
                });
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=authRepository.js.map