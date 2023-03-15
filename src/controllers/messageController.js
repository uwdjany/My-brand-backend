
import Response from "../utilis/response"
import httpStatus from "http-status"
export const sendMessage =(Message)=>async(res,req)=>{
try {
    const query = await Message.create(req.body)
    if(!query){
return Response.errorMessage(res, "failed", httpStatus.BAD_REQUEST)
    }
    return Response.successMessage(res, "success", query, httpStatus.OK)
    
} catch (error) {
    console.log(error)
}



}

export const getAllMessage =(Message)=> async(res,req)=>{
const query = await Message.find()
if(!query){
    return Response.errorMessage(res, "Failed", httpStatus.BAD_REQUEST )
}
return Response.successMessage(res, "success", query,httpStatus.OK)

}