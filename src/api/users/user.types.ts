import { ObjectId, Document } from "mongoose"

export enum Role {
    ARTIST = "artist",
    ORGANIZER = "organizer",
    USER = "user"
}

export interface IUser extends Document {
    id:ObjectId;
    email: string;
    password: string;
    name: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(userPassword:string):Promise<boolean>;
}



