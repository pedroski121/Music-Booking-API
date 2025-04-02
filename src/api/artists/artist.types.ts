import { ObjectId, Document } from "mongoose";

export enum MusicGenres {
  POP = "Pop",
  ROCK = "Rock",
  HIP_HOP = "Hip-Hop",
  RNB = "R&B",
  ELECTRONIC = "Electronic",
  JAZZ = "Jazz",
  CLASSICAL = "Classical",
  COUNTRY = "Country",
  REGGAE = "Reggae",
  METAL = "Metal",
  AFROBEAT="Afrobeat",
  OTHER = "Other",
}

export interface IArtist extends Document {
    id:ObjectId; 
    userId:ObjectId;
    stageName:string;
    genres:MusicGenres[];
    socialLinks:String[];
    bio:string; 
    priceTag:Number;
    availability:boolean;
    rating:number; 
    createdAt:Date;
    updatedAt:Date;
}



