import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected successfully");
    }
    catch(error){
        console.log("Error in connecting to the DB :", error);
        process.exit(1);
    }
}

export default connectDB;