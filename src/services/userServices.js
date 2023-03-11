import userModel from "../db/model/user";
import { createUser, getAll, getOne, deleteOne, update } from "../controllers/userController";

export const createController = createUser(userModel);
export const getAllController = getAll(userModel);
export const getOneController = getOne(userModel);
export const deleteOneController = deleteOne(userModel);
export const updateController = update(userModel);
