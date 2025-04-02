import { Response, NextFunction} from 'express';
import { AuthenticatedRequest } from './auth.types';
import { verifyToken } from './auth.service';

export const auth = (req:AuthenticatedRequest, res:Response, next:NextFunction):void=>{
    try {
        const token = req.header("Authorization")?.replace('Bearer ', '');
        if(!token){
            res.status(401).json({message:"Unauthorized to access endpoint", success:false});
            return;
        }
        const payload = verifyToken(token);
        req.user = payload
        next()
    } catch(err){
        res.status(401).json({message:"Token is not valid", success:false});
    }

}