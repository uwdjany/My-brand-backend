import Response from "../utilis/response";
import status from "http-status";

export const createUser = (Model) => async (req, res, next) => {
  try {
    const data = await Model.create(req.body);
    if (!data) {
      return Response.errorMessage(
        res,
        "failed to register",
        status.BAD_REQUEST
      );
    }
    return Response.successMessage(res, "successfuly created", data, status.OK);
  } catch (error) {
    console.log(error);
  }
};

//get all datas

export const getAllUser = (Model) => async (req, res, next) => {
  try {
    const data = await Model.find();
    if (!data) {
      return Response.errorMessage(res, "failed!", status.BAD_REQUEST);
    }
    return Response.successMessage(res, "Success", data, status.OK);
  } catch (error) {
    console.log(error);
  }
};

//get One By Id datas

export const getOneUser = (Model) => async (req, res, next) => {
  try {
    const data = await Model.findById(req.params.id);
    if (!data) {
      return Response.errorMessage(res, "failed!", status.BAD_REQUEST);
    }
    return Response.successMessage(res, "Success", data, status.OK);
  } catch (error) {
    console.log(error);
  }
};

//Update One By Id datas

export const updateUser = (Model) => async (req, res, next) => {
  try {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return Response.errorMessage(res, "failed", status.BAD_REQUEST);
    }
    return Response.successMessage(res, "Success", data, status.OK);
  } catch (error) {
    console.log(error);
  }
};

//delete One By Id datas

export const deleteUser = (Model) => async (req, res, next) => {
  try {
    const data = await Model.findByIdAndDelete(req.params.id);

    if (!data) {
      return Response.errorMessage(res, "failed!", status.BAD_REQUEST);
    }
    return Response.successMessage(res, "Success", data, status.OK);
  } catch (error) {
    console.log(error);
  }
};
