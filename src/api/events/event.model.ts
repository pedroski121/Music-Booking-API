import { Schema, model } from 'mongoose';
import { IEvent, EventStatus} from './event.types';
const EventSchema = new Schema<IEvent>(
  {
    id:{
        type:Schema.Types.ObjectId
    },
    userId:{
        type:Schema.Types.ObjectId, 
        required:true, 
        ref:"User"
    },
    venueId:{
        type:Schema.Types.ObjectId,
        required:false, 
        ref:"Venue"
    },
    name: {
      type: String,
      required: true,
     },
    description: {
      type: String,
      required: true
    },
    eventDate: {
      type: Date,
      required: false
    },
    eventTime: {
      type: String,
      required: false
    },
    duration: {
      type: Number,
      required: false
    },
    status: {
      type: String,
      enum: Object.values(EventStatus),
      default: EventStatus.PENDING
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    },
    versionKey:false
  }
);



const Event = model<IEvent>('Event', EventSchema);
export default Event;