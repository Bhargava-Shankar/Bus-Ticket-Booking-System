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
exports.BusService = void 0;
const http_status_codes_1 = require("http-status-codes");
const dataSource_1 = __importDefault(require("../utils/dataSource"));
const responseFormat_1 = require("../utils/responseFormat");
const busRepsitory_1 = require("../repository/busRepsitory");
const bookingRespository_1 = require("../repository/bookingRespository");
class BusService {
    constructor() {
        this.busRepository = new busRepsitory_1.BusRepository();
        this.bookingRespository = new bookingRespository_1.BookingRepository();
        this.db = dataSource_1.default.getInstance();
    }
    getAllBusService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const busDetails = yield this.busRepository.getBuses(data);
                return busDetails;
            }
            catch (e) {
                throw new responseFormat_1.AppError("Internal Server Error", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    bookBusService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //MAKING TRANSACTION AS A WHOLE, IF ONE OF THE TWO QUERIES FAIL
            //THE WHOLE TRANSACTION WILL ROLLBACK
            try {
                return yield this.db.$transaction([
                    this.bookingRespository.createBooking(data),
                    this.busRepository.decreaseBusSeat(data)
                ]);
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.BusService = BusService;
//# sourceMappingURL=busService.js.map