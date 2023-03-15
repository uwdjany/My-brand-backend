import User from "../db/model/user"
import { createUser, getAllUser, getOneUser,updateUser,deleteUser } from "../controllers/userController"
export const createUserService = createUser(User)
export const getAllUserService = getAllUser(User)
export const getOneUserService = getOneUser(User)
export const updateUserService = updateUser(User)
export const deleteUserService = deleteUser(User)

