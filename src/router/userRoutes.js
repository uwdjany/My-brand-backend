import { Router } from "express";
import * as UserController from "../controllers/userController";
import {checkUser,loginUser}from "../middleware/checkUserExit";
import Validation from "../middleware/validation"
const route=Router();
route.post("/login",loginUser)
route
/**
 * @swagger
 * /:
 * get:
 * summary :This api is used to check if get
 * responses:
 * 200
 * description:To test Get method
 * 
 */
.route("/")
.post(checkUser,UserController.createController)
.get(UserController.getAllController)


route
.route("/:id")
.patch(UserController.updateController)
.get(UserController.getOneController)
.delete(UserController.deleteOneController);

export default route;