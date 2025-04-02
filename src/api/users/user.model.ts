import { IUser, Role } from "./user.types";
import { Schema, model} from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new Schema<IUser>({
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    password: {
        type:String,
        required:true, 
    },
    name: {
        type:String, 
        required:true
    }, 
  
    role:{
        type:String, 
        enum:Object.values(Role), 
        default:Role.USER
    },  
    
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


  userSchema.methods.comparePassword = async function(this:IUser,userPassword:string):Promise<boolean>{
    return await bcrypt.compare(userPassword, this.password)
  }
  const User = model<IUser>('User', userSchema);
  export default User;