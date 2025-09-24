import { model, Schema } from "mongoose"
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

interface IUser{
    name:String,
    age:Number,
    status?:UserRole
}

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(UserRole)
    }
},{timestamps:true})

const User = model("User",userSchema);
export default User;

