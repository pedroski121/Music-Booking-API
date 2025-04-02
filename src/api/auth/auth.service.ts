import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import { TokenPayload } from './auth.types';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';



// generate a token for user
export const generateToken = (payload:TokenPayload):string =>{
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn:'1d'});
    return token;
}

// verify the user token is valid
export const verifyToken = (token:string):TokenPayload=> {
    return jwt.verify(token,JWT_SECRET) as TokenPayload;
}




