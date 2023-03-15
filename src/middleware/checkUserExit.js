import userModel from "../db/model/user";
import { hashPassword,isPasswordMatching } from "../utilis/hashedPassword";
import Response from "../utilis/response";
import status from "http-status";
import { generateToken } from "./token";
export const checkUser = async(req,res,next)=>{
    let {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        req.body.password = hashPassword(password);
        return next();
    }
    return Response.errorMessage(res, "user is already exist", status.CONFLICT);
};
export const loginUser = async(req,res)=>{
    let {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return Response.errorMessage(res, "user is not exist", status.NOT_FOUND);
    }
    if(isPasswordMatching(password,user.password)){
        user.password = null;
        const token = generateToken({user});
        return Response.successMessage(
            res,
            "Successfully Logged in",
            {user,token},
            status.OK
             )
      
    }
return Response.errorMessage(res, "Invalid email or password", status.BAD_REQUEST);

}