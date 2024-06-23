import { Prisma } from "@prisma/client";
import myClient from "../utils/dataSource";
import { getAllBusRequest } from "../interfaces";
import { gteDate, ltDate } from "../utils/date";
import { AppError } from "../utils/responseFormat";
import { StatusCodes } from "http-status-codes";
import { PrismaPromise } from "@prisma/client";

const db = myClient.getInstance();
export class BusRepository{
    model: Prisma.BusDelegate
    constructor() {
        this.model = db.bus 
    }

    async getBuses(data: getAllBusRequest) {
        const {source,destination,departureDate,travelsName} = data
        try {
            return await db.bus.findMany({
                where: {
                    source: source,
                    destination: destination,
                    departureTime: (departureDate) ? {
                        gte: gteDate(departureDate),
                        lt: ltDate(departureDate)
                    } : undefined,
                    travelsName: {
                        contains: travelsName
                    }
                }
            })
        }
        catch (e) {
            throw new AppError("Internal Server Error",StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    decreaseBusSeat(data: any): PrismaPromise<any> {
        const {busId,seatNumbers} = data
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
        })
        }
        catch (e) {
            throw e
        }
        
    }
}