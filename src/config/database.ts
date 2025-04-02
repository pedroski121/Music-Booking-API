import mongoose from 'mongoose';

const connectDB = async ():Promise<void> =>{
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if(!MONGO_URI){
            throw new Error('MongoURI is not defined')
        }
        await mongoose.connect(MONGO_URI); 
        console.log(`MongoDB Connected`);
    } catch(e) {    
        console.log(`${e}`); 
        process.exit(1);
    }
}

export default connectDB;