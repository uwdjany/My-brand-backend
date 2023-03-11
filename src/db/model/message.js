import mongoose from "mongoose";
const Schema = new mongoose.Schema({
name:String,
email:String,
message:String
},{ timestamps: true })
export default mongoose.model("message",Schema)