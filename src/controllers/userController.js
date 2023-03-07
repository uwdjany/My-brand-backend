
import userModel from "../db/model/user";
import {create,getAll,getOne,deleteOne,update} from "./globalControllers";

export const createController = create(userModel);
export const getAllController = getAll(userModel);
export const getOneController = getOne(userModel);
export const deleteOneController = deleteOne(userModel);
export const updateController = update(userModel);