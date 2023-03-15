import blog from "../db/model/blog";
import {create,getAll,getOne,deleteOne,update} from "../controllers/blogController";

export const createBlogServices = create(blog)
export const getAllBlogService = getAll(blog)
export const getOneServices = getOne(blog)
export const deleteOneBlog = deleteOne(blog)
export const updateBlog = update(blog)