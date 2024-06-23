import { Prisma, PrismaPromise } from "@prisma/client";
import myClient from "../utils/dataSource";
import { setSeatPrice } from "../utils/seat";
const db = myClient.getInstance()

export class BookingRepository{
    model: Prisma.BookingsDelegate
    constructor() {
        this.model = db.bookings
    }

    createBooking(data: any): PrismaPromise<any> {
        const {userId,busId,seatNumbers,totalPrice} = data
        try {
            return this.model.create({
                data: {
                    userId: userId,
                    busId: busId,
                    bookedSeats: seatNumbers,
                    totalPrice: setSeatPrice(seatNumbers)
            }
        })
        }
        catch (e) {
            throw e
        }
      
    }

}