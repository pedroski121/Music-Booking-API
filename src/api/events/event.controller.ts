import {Request, Response} from 'express';
import Event from './event.model';
import { AuthenticatedRequest } from '../auth/auth.types';


export const getEvents = async (req:Request, res:Response ):Promise<void> => {
    const {page = 1, limit = 30} = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    try {
        const events = await Event.find({}).skip(skip).limit(Number(limit)).sort({createdAt:-1});
        res.status(200).json(events);
    } catch(error){
        console.log(`${error}`)
        res.status(500).json({message:"Error fetching events", success:false})
    }
}

export const getEventDetails = async (req:Request, res:Response):Promise<void> => {
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId);
        if(event){
            res.status(200).json(event);
        } else {
            res.status(404).json({message:"Event not found", success:false})
        }
    } catch(error){
        console.log(`${error}`)
        res.status(500).json({message:"Error fetching event", success:false})
    }
}

export const createEvent = async (req:AuthenticatedRequest, res:Response):Promise<void> => {
    const user = req.user;
    const eventData = req.body;
    try {
        const event = new Event({...eventData, userId:user?.userId});
        await event.save();
        res.status(201).json({message:"Event created", success:true});
    } catch(error){
        console.log(`${error}`)
        res.status(500).json({message:"Event not created", success:false})
    }
}

export const updateEvent = async (req:AuthenticatedRequest, res:Response):Promise<void> => {
    const eventId = req.params.id;
    const user = req.user;
    const eventUpdateData = req.body;
    try {
        const event = await Event.findOneAndUpdate({_id:eventId, userId:user?.userId}, {...eventUpdateData});
        if(!event){
            res.status(500).json({message:"Event not found for current user", success:true});
        } else {
            res.status(200).json({message:"Event updated", success:true});

        }
    } catch(error){
        console.log(`${error}`);
        res.status(500).json({message:"Error occured while updating event", success:false})
    }
}

export const deleteEvent = async (req:AuthenticatedRequest, res:Response):Promise<void> =>{
    const eventId = req.params.id;
    const user = req.user;
    try {
        const event = await Event.findOneAndDelete({_id:eventId, userId:user?.userId});
        if(!event){
            res.status(500).json({message:"Event not found for current user", success:false});
        } else  {
            res.status(200).json({message:"Event deleted", success:true});
        }

    } catch(error) {
        console.log(`${error}`);
        res.status(500).json({message:"Error occured trying to delete event", success:false});

    }
}