import  {Request, Response} from 'express';
import Venue from './venue.model';
import Event from '../events/event.model';
import { AuthenticatedRequest } from '../auth/auth.types';

export const getVenues = async (req:Request, res:Response):Promise<void>=>{
    const {page = 1, limit = 30} = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    try {
        const venues = await Venue.find({}).skip(skip).limit(Number(limit)).sort({createdAt:-1});
        res.status(200).json(venues);
    } catch(error){
        res.status(500).json({message:"Error fetching venue list", success:false})
    }
}

export const getVenueDetails = async (req:Request, res:Response):Promise<void> => {
    const venueId = req.params.id;
    try{
        const venue = await Venue.findById(venueId);
        if(!venue){
            res.status(404).json({message:"Venue not found", success:false})

        } else {
            res.status(200).json(venue);
        }

    } catch(error){
        console.log(`${error}`);
        res.status(500).json({message:"Error fetching venue details", boolean:false})
    }
}

export const getVenueEvents =  async (req:Request, res:Response):Promise<void>=>{
    const venueId = req.params.id;
    try {
        const events = await Event.find({venueId});
        res.status(200).json(events);

    } catch(error){
        console.log(`${error}`);
        res.status(500).json({message:"Error fetching events at a venue", success:false});
    }
}

export const createVenue = async (req:AuthenticatedRequest, res:Response):Promise<void> => {
    const venueDetails = req.body;
    const user = req.user;
    try {
        const venue = new Venue({...venueDetails, userId:user?.userId});
        await venue.save();
        res.status(201).json({message:"Venue created", success:true});

    } catch(error){
        console.log(`${error}`)
        res.status(500).json({message:"Error creating venue", success:false});
    }
}

export const updateVenueDetails = async (req:AuthenticatedRequest, res:Response):Promise<void>=>{
    const venueID = req.params.id;
    const user = req.user;
    const venueUpdateDetails = req.body;
    try {
        const venue = await Venue.findOneAndUpdate({_id:venueID, userId:user?.userId}, venueUpdateDetails);
        if(!venue){
            res.status(401).json({message:"Venue not found for current user", success:false});

        } else {
            res.status(201).json({message:"Venue details updated", success:true});
        }
    } catch(error){
        console.log(`${error}`);
        res.status(500).json({message:"Error occured while updating venue", success:false});

    }
}