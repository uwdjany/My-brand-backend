import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken =(data)=>{
return jwt.sign(data, process.env.JWT_KEY , {expiresIn:"30d"});
}
export const decodeToken =(token)=>{
    return jwt.verify(token,process.env.JWT_KEY);

}