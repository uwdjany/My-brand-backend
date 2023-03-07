import { Router } from "express";
import * as UserController from "../controllers/userController";
import {checkUser,loginUser}from "../middleware/checkUserExit"
const route=Router();
route.post("/login",loginUser)
route
.route("/")
.post(checkUser, UserController.createController)
.get(UserController.getAllController)

route
.route("/:id")
.patch(UserController.updateController)
.get(UserController.getOneController)
.delete(UserController.deleteOneController);

export default route;