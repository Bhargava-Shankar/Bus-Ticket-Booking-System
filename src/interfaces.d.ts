export interface userRegisterCredentials {
    username: string,
    password: string,
    email: string
}

export interface userLoginCredentials {
    email: string,
    password: string,
}

export  interface getAllBusRequest {
    source: string,
    destination: string,
    departureDate: string,
    travelsName?: string
}

export interface bookBusRequest {
    busId: string,
    userId: string,
    seatNumbers: string[]
}