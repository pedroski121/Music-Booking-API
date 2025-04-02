import { ObjectId } from "mongoose";

export enum EventStatus {
    PENDING = 'pending',       // Awaiting approval (if moderation is required)
    PUBLISHED = 'published',   // Publicly visible and bookable
    IN_PROGRESS = 'in_progress', // Event is currently happening
    COMPLETED = 'completed',   // Event successfully took place
    CANCELLED = 'cancelled',     // Event was canceled before it happened
  }

export interface IEvent extends Document {
    venueId?: ObjectId; 
    id:ObjectId;
    userId:ObjectId;
    name: string;
    description: string;
    eventDate?: Date;
    eventTime?: Date;
    duration?: number;
    status: EventStatus;
  }