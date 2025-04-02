import  {Request, Response} from 'express';
import User from '../users/user.model';
import bcrypt from 'bcrypt';
import { generateToken } from './auth.service';
import { validationResult} from 'express-validator';

export const registerController = async (req:Request, res:Response):Promise<void>=> {
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

    try {
        const { name, email, password, role } = req.body;
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ name, email, password:hashedPassword, role })
        const newUser = await user.save()
        res.status(201).json({message: `${newUser.name} account created` , success:true});
      } 
    catch (error) {
        console.log(`${error}`)
        res.status(500).json({message:"User account not created", success:false})
      }
}

export const loginController =  async (req:Request, res:Response):Promise<void>=>{
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
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const validPassword = await user?.comparePassword(password);
        if(user && validPassword){
            const payload = {email, userId:user?.id}
            const token = generateToken(payload);
            res.status(201).json({...payload, token});
        } else {
            res.status(401).json({message:"Invalid credentials", success:false});
    
        }
    } catch(error){
        console.log(`${error}`);
        res.status(500).json({message:"An error occured logging in", success:false});
    }
    
}

