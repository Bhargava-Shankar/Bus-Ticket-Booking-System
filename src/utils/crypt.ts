import bcrypt from "bcrypt";

export function hashPassword(password: string): string {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
}

export function comparePassword(password: string,hash: string): boolean {
    return bcrypt.compareSync(password, hash);
    
}
