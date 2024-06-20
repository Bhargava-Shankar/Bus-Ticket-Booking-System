import { PrismaClient } from '@prisma/client'


class myClient{
    static prismaClient: PrismaClient;
    constructor() {
        if (!myClient.prismaClient) {
            myClient.prismaClient = new PrismaClient();
        }
    }

    static getInstance() {
        if (!myClient.prismaClient) {
            new myClient();
        }
        return myClient.prismaClient;
    }

}

export default myClient;