import { StatusCodes } from "http-status-codes";
import { getAllBusRequest } from "../interfaces";
import myClient from "../utils/dataSource"
import { AppError } from "../utils/responseFormat";
import { BusRepository } from "../repository/busRepsitory";
import { BookingRepository } from "../repository/bookingRespository";


export class BusService{
    busRepository = new BusRepository()
    bookingRespository = new BookingRepository()
    db = myClient.getInstance()
    async getAllBusService(data: getAllBusRequest) {
        
        try {
            const busDetails = await this.busRepository.getBuses(data)
            return busDetails
        }
        catch (e) {
            throw new AppError("Internal Server Error",StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async bookBusService(data: any) {
        
        //MAKING TRANSACTION AS A WHOLE, IF ONE OF THE TWO QUERIES FAIL
        //THE WHOLE TRANSACTION WILL ROLLBACK
        try {
            return await this.db.$transaction([
            this.bookingRespository.createBooking(data),
            this.busRepository.decreaseBusSeat(data)]
        )
        }
        catch (e) {
            throw e
        }
       
    }
}