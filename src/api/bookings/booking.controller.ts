import  {Request, Response} from 'express';
import Booking from './booking.model';
import Event from '../events/event.model';
import Artist from '../artists/artist.model';
import { AuthenticatedRequest } from '../auth/auth.types';
import { BookingStatus } from './booking.types';
import { validationResult } from 'express-validator';

export const getBookings = async (req:Request, res:Response):Promise<void> => {
    const {page = 1, limit = 30} = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    try {
        const bookings = await Booking.find({}).skip(skip).limit(Number(limit)).sort({createdAt:-1}); 
        res.status(200).json(bookings);

    } catch(error){
        console.log(`${error}`);
        res.status(500).json({message:"Error fetching bookings", success:false});
    }
}

export const getBookingDetails = async (req:Request, res:Response):Promise<void>=>{
    const bookingID = req.params.id;
     try {
            const event = await Booking.findById(bookingID);
            if(event){
                res.status(200).json(event);
            } else {
                res.status(404).json({message:"Booking not found", success:false})
            }
        } catch(error){
            console.log(`${error}`)
            res.status(500).json({message:"Error fetching booking", success:false})
        }
}

export const createBooking = async (req:AuthenticatedRequest, res:Response):Promise<void>=>{
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
    const user = req.user;
    const bookingData = req.body;
    const artist = await Artist.findById(bookingData.artistId);
    const event = await Event.findById(bookingData.eventId);
    if(!event || !artist){
        res.status(404).json({message:"Event or Artist does not exist", success:false});
        return;
    }
    try {
        const booking = new Booking({...bookingData, userId:user?.userId, status:BookingStatus.REQUESTED});
        await booking.save();
        res.status(201).json({message:"Booking created", success:true});
    } catch(error){
        console.log(`${error}`)
        res.status(500).json({message:"Booking not created", success:false})
    }
}

export const updateBooking = async (req:AuthenticatedRequest, res:Response):Promise<void>=>{
    const bookingID = req.params.id;
    const user = req.user;
    const bookingUpdateData = req.body;

    const artist = await Artist.findOne({userId:user?.userId});
    try {
        const booking = await Booking.findOneAndUpdate({
            _id:bookingID,
             $or:[{userId: user?.userId }, { artistId: artist?.id }]
        },
            {...bookingUpdateData});
        if(!booking){
            res.status(500).json({message:"Booking not found for current user", success:false});
        } else {
            res.status(200).json({message:"Booking updated", success:true});
        }
    } catch(error){
        console.log(`${error}`);
        res.status(500).json({message:"Error occured while updating booking", success:false})
    }
}