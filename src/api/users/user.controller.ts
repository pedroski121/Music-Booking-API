import  {Response} from 'express';
import { AuthenticatedRequest } from '../auth/auth.types';
import User from './user.model';
import { validationResult } from 'express-validator';

export const currentUserController = async (req:AuthenticatedRequest, res:Response):Promise<void> => {
    const userPayload = req.user;
    try {
        const user = await User.findById(userPayload?.userId).select("-password");
        if(!user){
            res.status(404).json({message:"User not found", success:false});
            return;
        }
        res.status(200).json(user)
        return;

    } catch(err) {
        console.log(`${err}`);
        res.status(404).json({message:"Invalid user", success:false});
    }
}

export const updateCurrentUser = async (req:AuthenticatedRequest, res:Response):Promise<void> => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const fields:string[] = [];
        errors.array().map((error)=>{
            //@ts-ignore
            !fields.includes(error.path) ? fields.push(error.path) : ''
        })
        res.status(400).json({message:`${fields.join(', ')} ${fields.length == 1 ? "is" : "are"} incorrect`, success:false});
        return;
    }

    const userPayload = req?.user;
    const {name, role} = req.body;
    let newDetails;
    // Only attach role/name to newDetails if they are provided in the request body
    if(name && role){
        newDetails = {name, role}
    } else if(name) {
        newDetails = {name}
    } else if(role){
        newDetails = {role}
    } else {
        throw new Error("Cannot update");
    }
    try {
        
        const user = await User.findByIdAndUpdate(userPayload?.userId, {...newDetails}).select("-password");
        if(!user){
            res.status(404).json({message:"User not found", success:false});
            return;
        }
        res.status(200).json({message:"Account updated successfully", success:true})
        return;

    } catch(err) {
        console.log(`${err}`);
        res.status(404).json({message:"An Error occured trying to update", success:false});
    }
}

export const deleteCurrentUserAccount = async (req:AuthenticatedRequest, res:Response):Promise<void> => {

    const userPayload = req?.user;
    try {
        const user = await User.findByIdAndDelete(userPayload?.userId);
        if(!user){
            res.status(404).json({message:"User not found", success:false});
            return;
        }
        res.status(200).json({message:"Account deleted successfully", success:true});
        return;
    } catch(err) {
        console.log(`${err}`);
        res.status(404).json({message:"Invalid user", success:false});
    }


}