type response = {
    status: "success" | "fail" | "error",
    data: any,
    message: any 
}

// class responseBody {
//     data: any
//     status: any
//     message?: string 
//     constructor(status:any, data: any, message?: any) {
//         this.status = status
//         this.data = data
//         this.message = message
//     }
// }

export const successResponse: response = {
    status: "success",
    data: {},
    message: {}
}

export const errorResponse: response = {
    status: "error",
    data: {},
    message: {}
}

export class AppError extends Error{
    statusCode: number
    message: string
    constructor(message: string,statusCode: number) {
        super(message)
        this.message = message
        this.statusCode = statusCode
    }
}


