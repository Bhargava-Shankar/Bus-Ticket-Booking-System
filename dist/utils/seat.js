"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSeatPrice = void 0;
const setSeatPrice = (seatNumbers) => {
    let totalPrice = 0;
    let i;
    for (i = 0; i < seatNumbers.length; i++) {
        let seatNumber = seatNumbers[i];
        if (seatNumber.substring(seatNumber.length - 1) in ['4', '5']) {
            totalPrice += 1000;
        }
        else {
            totalPrice += 800;
        }
    }
    return totalPrice;
};
exports.setSeatPrice = setSeatPrice;
//# sourceMappingURL=seat.js.map