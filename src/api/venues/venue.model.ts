import {Schema, model} from 'mongoose';
import { IVenue } from './venue.types';

const venueSchema = new Schema<IVenue>({
    userId: {
        type:Schema.Types.ObjectId,
        required:true
    }, 
    description:{
        type:String, 
        required:true
    }, 
    address:{
        type:String,
        required:true
    }, 
    ameneties:{
        type:[String], 
        required:false
    }, 
    capacity:{
        type:Number, 
        required:false
    }, 
    images:{
        type:[String], 
    }
}, {
    toJSON: {
        transform(_, ret) {
          // Remove _id, __v and password  fields  what is returned
          ret.id = ret._id;
          delete ret._id;
          delete ret.__version;
          
        }
      },
      versionKey:false
    }
)

const Venue = model<IVenue>("Venue", venueSchema);

export default Venue;