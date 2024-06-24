"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class myClient {
    constructor() {
        if (!myClient.prismaClient) {
            myClient.prismaClient = new client_1.PrismaClient();
        }
    }
    static getInstance() {
        if (!myClient.prismaClient) {
            new myClient();
        }
        return myClient.prismaClient;
    }
}
exports.default = myClient;
//# sourceMappingURL=dataSource.js.map