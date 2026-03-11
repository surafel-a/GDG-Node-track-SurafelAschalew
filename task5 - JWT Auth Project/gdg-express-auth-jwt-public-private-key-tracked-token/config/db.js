import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    }catch(err){
        console.log(`Couldn't connect`)
    }
}

export default connectDb;