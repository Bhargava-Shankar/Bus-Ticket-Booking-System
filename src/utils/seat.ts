export const setSeatPrice = (seatNumbers: string[]): number => {
    let totalPrice: number = 0;
    let i: number;
    for (i = 0; i < seatNumbers.length; i++)
    {
        let seatNumber: string = seatNumbers[i];
        if (seatNumber.substring(seatNumber.length - 1) in ['4', '5']) {
            totalPrice += 1000;
        }
        else {
            totalPrice += 800;
        }
    }
    return totalPrice;
}
