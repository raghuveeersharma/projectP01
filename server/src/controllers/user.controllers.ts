import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
export const postUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {name , age ,status}=req.body;
        const user=new User({name,age,status});
        await user.save();
        res.status(200).json({message:"user created successfully",user})
    } catch (error) {
        next(error)
    }
}

export const getUser=async(res:Response,req:Request,next:NextFunction)=>{
try {
    const id=req.params._id;
    const user = await User.findById({_id:id});
    if(!user){
        const error=new Error("no user found");
        throw error;
    }
    res.status(200).json({message:"user found",user})
} catch (error) {
    next(error)
}
}

export const getUsers=(req:Request,res:Response,next:NextFunction)=>{
    try {
        const users=User.find();
        if(!users){
            const error=new Error("no user found");
            throw error;
        }
        res.status(200).json({message:"all users",users})
        
    } catch (error) {
        next(error)
        
    }

}
export const deleteUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=req.params._id;
        const user=await User.findByIdAndDelete(id);
        if(!user){
            const error=new Error("no user found");
            throw error;
        }
        res.status(200).json({message:"user deleted successfully",user})        
    } catch (error) {
        next(error)
        
    }
}

export const updtaeUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=req.params._id;
        const {name,age,status}=req.body;
        const user=await User.findByIdAndUpdate(id,{name,age,status},{new:true});
        if(!user){
            const error=new Error("no user found");
            throw error;
        }
        res.status(200).json({message:"user updated successfully",user})        
    } catch (error) {
        next(error)
        
    }
}