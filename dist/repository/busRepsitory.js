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
exports.BusRepository = void 0;
const dataSource_1 = __importDefault(require("../utils/dataSource"));
const date_1 = require("../utils/date");
const responseFormat_1 = require("../utils/responseFormat");
const http_status_codes_1 = require("http-status-codes");
const db = dataSource_1.default.getInstance();
class BusRepository {
    constructor() {
        this.model = db.bus;
    }
    getBuses(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { source, destination, departureDate, travelsName } = data;
            try {
                return yield db.bus.findMany({
                    where: {
                        source: source,
                        destination: destination,
                        departureTime: (departureDate) ? {
                            gte: (0, date_1.gteDate)(departureDate),
                            lt: (0, date_1.ltDate)(departureDate)
                        } : undefined,
                        travelsName: {
                            contains: travelsName
                        }
                    }
                });
            }
            catch (e) {
                throw new responseFormat_1.AppError("Internal Server Error", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    decreaseBusSeat(data) {
        const { busId, seatNumbers } = data;
        try {
            return db.bus.update({
                where: {
                    busId: busId
                },
                data: {
                    seatsAvailable: {
                        decrement: seatNumbers.length
                    }
                }
            });
        }
        catch (e) {
            throw e;
        }
    }
}
exports.BusRepository = BusRepository;
//# sourceMappingURL=busRepsitory.js.map