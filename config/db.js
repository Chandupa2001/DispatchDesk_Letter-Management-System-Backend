import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://chanduparanawaka2001:k9rgPkIEIOttXRPR@cluster.l4twq.mongodb.net/DispatchDesk')
    .then(()=>console.log("DB Connected"));
}