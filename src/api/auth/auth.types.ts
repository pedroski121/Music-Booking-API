import { Request } from "express";
import { ObjectId } from "mongoose";

export interface TokenPayload {
    userId:ObjectId;
    email:string;
}


export interface AuthenticatedRequest extends Request {
    user?:TokenPayload;
}