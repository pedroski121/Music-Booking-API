import { IArtist } from "./artist.types";
import { Schema, model} from "mongoose";
import { MusicGenres } from "./artist.types";

const artistSchema = new Schema<IArtist>(  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
      unique:true
    },

    stageName: {
      type: String,
      required: true,
      maxlength: 30,
      minlength: 1
    },
    genres: {
      type: [String],
      required: true,
      enum: {
        values: Object.values(MusicGenres)
        
      }
    },
    bio: {
      type: String,
      required: true,
      maxlength: 150,
      minlength: 5
    },
    priceTag:{
      type:Number, 
      required:true
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }
  },
  {
    timestamps:true,
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__version;
        
      }
    },
    versionKey:false
  }); 


  const Artist = model<IArtist>('Artist', artistSchema);
  export default Artist;