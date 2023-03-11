import status from "http-status";
import Response from "../utilis/response";


export const createUser =(Model)=> async(req,res,next)=>{
    try {
        const data = await Model.create()

        if(!data){
            return Response.errorMessage(res, "Failed to create", status.BAD_REQUEST);

        }
        return Response.successMessage(res, "success", data, status.OK);
    } catch (error) {
        console.log(error)
        
    }

}
  // Get all operation
  export const getAll = (Model) => async (req, res, next) => {
    try {
      const data = await Model.find();
      if (!data) {
        return Response.errorMessage(res, "Failed", status.BAD_REQUEST);
      }
      return Response.successMessage(res, "success", data, status.OK);
    } catch (error) {
      console.log(error);
    }
  };
  //Get One operation
  export const getOne = (Model) => async (req, res, next) => {
    try {
      const data = await Model.findById(req.params.id);
      if (!data) {
        return Response.errorMessage(res, "Failed", status.BAD_REQUEST);
      }
      return Response.successMessage(res, "Success", data, status.OK);
    } catch (error) {
      console.log(error);
    }
  };
  
  //Update Operation
  
  export const update = (Model) => async (req, res, next) => {
    try {
      const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!data) {
        return Response.errorMessage(res, "Failed", status.BAD_REQUEST);
      }
      return Response.successMessage(res, "Success", data, status.OK);
    } catch (error) {
      console.log(error);
    }
  };
  
  //Delete Operation
  
  export const deleteOne = (Model) => async (req, res, next) => {
    try {
      const data = await Model.findByIdAndDelete(req.params.id);
      if (!data) {
        return Response.errorMessage(res, "Failed", status.BAD_REQUEST);
      }
      return Response.successMessage(res, "Success", data, status.OK);
    } catch (error) {
      console.log(error);
    }
  };
  