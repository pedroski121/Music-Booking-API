import  {Request, Response} from 'express';
import { AuthenticatedRequest } from '../auth/auth.types';
import Artist from './artist.model';
import { validationResult } from 'express-validator';

export const getArtists = async (req:Request, res:Response):Promise<void> => {
    const {page = 1, limit = 30} = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    try {
        const artists = await Artist.find({}).skip(skip).limit(Number(limit)).sort({createdAt:-1});
        res.status(201).json(artists);

    } catch(error) {
        console.log(`${error}`);
        res.status(500).json({message:"Error fetching artists", success:false})
    }  
}

export const getArtistProfile = async (req:Request, res:Response):Promise<void> => {
    const{ id }= req.params;
    try {
        const artist = await Artist.findById(id);
        if(artist){
            res.status(200).json(artist);
        } else {
            res.status(404).json({message:"Artist profile does not exist", success:false});
        }

    } catch(error){
        console.log(`${error}`);
        res.status(500).json({success:false, message:"Error fetching the artist"});

    }
}

export const createArtistProfile = async (req:AuthenticatedRequest,res:Response):Promise<void> => {
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
    const userPayload = req.user;
    const artistDetails = req.body;
    try {
    
        const artist = await Artist.findOne({userId:userPayload?.userId});
        if(artist) {
            res.status(400).json({message:"Artist acccount already created",success:false});
        } else {
            const newArtist = new Artist({...artistDetails, userId:userPayload?.userId});
            await newArtist.save();
            res.status(201).json({message:"Artist account created", success:true});
        }
    } catch(error){
        console.log(`${error}`);
        res.status(500).json({message:"Error creating account", success:false});
    }

}

export const updateArtistProfile = async (req:AuthenticatedRequest, res:Response):Promise<void> => {
    const updateDetails = req.body;
    const user = req.user;
    try {
        const artist = await Artist.findOneAndUpdate({userId:user?.userId}, updateDetails);
        if(!artist){
            res.status(404).json({message:"Artist profile not found", success:false});
        } else {
            res.status(200).json({message:"Artist profile updated", success:true});
        }
    } catch(err){
        console.log(`${err}`);
        res.status(500).json({message:"Error updating artist profile", success:false});
    }
}