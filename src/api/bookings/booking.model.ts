import { Schema, model} from "mongoose";
import { BookingStatus, IBooking} from "./booking.types";


const bookingSchema = new Schema<IBooking>({
    eventId:{
        type: Schema.Types.ObjectId,
        required:true, 
        ref:'Event'
    }, 
    artistId:{
        type:Schema.Types.ObjectId,
        required:true, 
        ref:'Artist'
    },
    userId:{
      type:Schema.Types.ObjectId,
      required:true, 
      ref:'User'
    },
    status:{
        type:String,
        enum: Object.values(BookingStatus), 
        default:BookingStatus.REQUESTED
    }, 
  
    performanceDate: {
      type:Date, 
      required:true
    }, 
    performanceTime:{
      type:String, 
      required:true
    }, 
    performanceDuration:{
      type:Number, // in minutes
      required:true
    }
  }, 
  {
    timestamps:true,
    toJSON: {
      transform(_, ret) {
        // Remove _id, __v and password  fields  what is returned
        ret.id = ret._id;
        delete ret._id;
        delete ret.__version;
        
      }
    },
    versionKey:false
  }); 


  
  const Booking = model<IBooking>('Booking', bookingSchema);
  export default Booking;