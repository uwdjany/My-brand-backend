import blogModel from "../db/model/blog";
import {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
} from "../controllers/blogController";
export const createBlog = create(blogModel);
export const getAllBlog = getAll(blogModel);
export const getOneBlog = getOne(blogModel);
export const deleteOneblog = deleteOne(blogModel);
export const editBlog = update(blogModel);
