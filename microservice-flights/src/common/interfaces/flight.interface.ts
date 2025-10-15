/* eslint-disable prettier/prettier */
import { IPassenger } from "./passenger.interface";

export interface IFlight extends Document{
    _id?: string;
    pilot:string;
    airplane:string;
    destinationCity:string;
    flightDate:Date;
    passenger: IPassenger[];
    
}