"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const dataSource_1 = __importDefault(require("../utils/dataSource"));
const seat_1 = require("../utils/seat");
const db = dataSource_1.default.getInstance();
class BookingRepository {
    constructor() {
        this.model = db.bookings;
    }
    createBooking(data) {
        const { userId, busId, seatNumbers, totalPrice } = data;
        try {
            return this.model.create({
                data: {
                    userId: userId,
                    busId: busId,
                    bookedSeats: seatNumbers,
                    totalPrice: (0, seat_1.setSeatPrice)(seatNumbers)
                }
            });
        }
        catch (e) {
            throw e;
        }
    }
}
exports.BookingRepository = BookingRepository;
//# sourceMappingURL=bookingRespository.js.map