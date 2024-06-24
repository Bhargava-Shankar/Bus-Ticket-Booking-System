"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.errorResponse = exports.successResponse = void 0;
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
exports.successResponse = {
    status: "success",
    data: {},
    message: {}
};
exports.errorResponse = {
    status: "error",
    data: {},
    message: {}
};
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=responseFormat.js.map