import jwt from "jsonwebtoken";

export function generateAccessToken(userId: string) {
    const secret = process.env.JWT_SECRET!;
    return jwt.sign({
        userId: userId
    }, secret ,{
        expiresIn: '24h',
        
    })
}

export function checkAccessToken(token: string) {
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return true;
    } catch (err) {
        // err
        return false;
    }

}
