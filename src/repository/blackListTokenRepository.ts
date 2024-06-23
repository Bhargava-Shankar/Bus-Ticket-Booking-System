
import myClient from "../utils/dataSource"
const db = myClient.getInstance()
export class BlackListTokenRepository{
    model: any 
    constructor() {
        this.model = db.blackListTokens
    }

    async addToken(token: string) {
        try {
         return await db.blackListTokens.create({
            data: {
                token: token!
            }
        })
        }   
        catch (e) {
            throw e
        }
    }
}