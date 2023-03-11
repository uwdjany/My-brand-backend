import { Router } from "express";
import * as UserServices from "../services/userServices"
import * as BlogServices from "../services/blogServices"
import * as MessageController from "../controllers/messageController";
import { checkUser, loginUser } from "../middleware/checkUserExit";
import { protect } from "../middleware/veryfyToken";
import {
  commentingOnArticle,
  likeArticle,
} from "../controllers/blogController";

const route = Router();
//users routes
route.get("/list/users", UserServices.getAllController);
route.post("/user/create", checkUser, UserServices.createController);
route.post("/user/login", loginUser);
route.get("/user/get/:id", UserServices.getOneController);
route.delete("/user/delete/:id", UserServices.deleteOneController);
route.put("/user/update/:id", UserServices.updateController);

//blog routes
route.post("/add/blog", protect, BlogServices.createBlog);
route.get("/blog/:id", BlogServices.getOneBlog);
route.get("/all/blog", BlogServices.getAllBlog);
route.delete("/delete/:id", BlogServices.deleteOneblog);
route.put("/update/:id", BlogServices.editBlog);
route.post("/blog/:article_id/comment", protect, commentingOnArticle);
route.post("/blog/:article_id/like", protect, likeArticle);

//message routes

route.post("/send/meesage", MessageController.addMessage);
route.get("/get-all/message", MessageController.getAllmessage);
route.get("/get-one/message/:id", MessageController.getOneMessage);
route.put("/update/message/:id", MessageController.updateMessage);
route.delete("/delete/message/:id", MessageController.deleteOneMessage);

export default route;
