import { Document, ObjectId } from "mongoose";

export enum BookingStatus {
    REQUESTED = 'requested',     // Initial request from event organizer
    CONFIRMED = 'confirmed',     // Both parties have agreed
    REJECTED = 'rejected',       // Artist declined the booking
    COMPLETED = 'completed'      // Performance has concluded
  }



export interface IBooking extends Document {
    id: ObjectId;
    eventId: ObjectId;      
    artistId: ObjectId;    
    userId:ObjectId;
    status: BookingStatus;
    performanceDate: Date;
    performanceTime:String; // 24 hour format
    performanceDuration: number; // in minutes
    createdAt: Date;
    updatedAt: Date;
}
  


