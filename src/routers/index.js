import { Router } from "express"
import {loginUser,checkUser} from "../middleware/checkUserExit"
import * as UserServices from "../services/userServices"
import { protect } from "../middleware/veryfyToken";
import {
  commentingOnArticle,
  likeArticle,
} from "../controllers/blogController";
import * as BlogServices from "../services/blogServices"
const router = Router()
//user
router.get("/user/all-user", UserServices.getAllUserService);
router.post("/user/create",checkUser, UserServices.createUserService);
router.post("/user/login", loginUser);
router.get("/user/one-user/:id", UserServices.getOneUserService);
router.delete("/user/delete/:id", UserServices.getAllUserService);
router.put("/user/update/:id", UserServices.updateUserService);

//blog

router.post("/add/blog", protect, BlogServices.createBlogServices);
router.get("/blog/:id", BlogServices.getOneServices);
router.get("/all/blog", BlogServices.getAllBlogService);
router.delete("/delete/:id",protect, BlogServices.deleteOneBlog);
router.put("/update/:id",protect, BlogServices.updateBlog);
router.post("/blog/:article_id/comment", protect, commentingOnArticle);
router.post("/blog/:article_id/like", protect, likeArticle);

export default router;