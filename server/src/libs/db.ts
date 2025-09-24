import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db =async ()=>{
    try {
        await mongoose.connect(process.env.mongoDB??"");
        console.log("db connect successfully!!")

    } catch (error) {
        console.log("error in connecting db",error)
        
    }
}
export default db;