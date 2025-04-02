import { Document, ObjectId } from "mongoose";


export interface IVenue extends Document {
    id: ObjectId; 
    userId:ObjectId;
    description:string;
    address:string;
    ameneties?:string[];
    capacity?:number, 
    images?:string[];
}