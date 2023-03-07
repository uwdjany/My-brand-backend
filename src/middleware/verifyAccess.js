import Response from "../utilis/response";
import status from "http-status";

export const verifyAccess =(requiredRole)=> async(req,res,next)=>{
try {
    
    const role = req.user.role;
    if(!requiredRole !== role){
        return Response.errorMessage(res,"only Admin can do this", status.BAD_REQUEST)
    }
    return next()
} catch (error) {
    console.log(error)
    
}
}