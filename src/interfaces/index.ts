export interface IBookingTime {
    start: string
    end: string
}

export interface IRoom {
    id: string
    name: string
    roomType: number
    pplType: number
    bookingTimes: IBookingTime[]
}
