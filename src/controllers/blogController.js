import status from "http-status";
import Response from "../utilis/response";
import imageUpload from "../helper/photoupload";
import { articleSchema } from "../helper/validation";
import User from "../db/model/user";
import blogModel from "../db/model/blog";

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;

export const create = (Model) => async (req, res, next) => {
  let reqData = req.body;
  try {
    await articleSchema.validateAsync(reqData);
    if (req.user.role.toString() == "admin") {
      let imageUrl = "";
      if (req.files) {
        const image = await imageUpload(req);
        imageUrl = image.url;
        reqData.image = imageUrl;
      }
      const data = await Model.create(reqData);

      if (!data) {
        return Response.errorMessage(
          res,
          "Failed to create",
          status.BAD_REQUEST
        );
      }
      return Response.successMessage(
        res,
        "successfully created",
        data,
        status.OK
      );
    } else {
      res.status(401).json({ message: "User Not Authorized" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// Get all operation
export const getAll = (Model) => async (req, res, next) => {
  try {
    const data = await Model.find();
    if (!data) {
      return Response.errorMessage(res, "Failed", status.BAD_REQUEST);
    }
    return Response.successMessage(res, "success", data, status.OK);
  } catch (error) {
    console.log(error);
  }
};
//Get One operation
export const getOne = (Model) => async (req, res, next) => {
  try {
    const data = await Model.findById(req.params.id);
    if (!data) {
      return Response.errorMessage(res, "Failed", status.BAD_REQUEST);
    }
    return Response.successMessage(res, "Success", data, status.OK);
  } catch (error) {
    console.log(error);
  }
};

//Update Operation

export const update = (Model) => async (req, res, next) => {
  try {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return Response.errorMessage(res, "Failed", status.BAD_REQUEST);
    }
    return Response.successMessage(res, "Success", data, status.OK);
  } catch (error) {
    console.log(error);
  }
};

//Delete Operation

export const deleteOne = (Model) => async (req, res, next) => {
  try {
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) {
      return Response.errorMessage(res, "Failed", status.BAD_REQUEST);
    }
    return Response.successMessage(res, "Success", data, status.OK);
  } catch (error) {
    console.log(error);
  }
};

export const commentingOnArticle = (req, res) => {
  const { article_id } = req.params;
  const { comment } = req.body;
  // console.log(article_id);
  User.findOne({
    _id: req.user.id
  }).then((user) => {
//  console.log(user);
    const newComment = {
      user_id: user._id,
      email: user.email,
      comment,
      postedDate: today,
    };
    blogModel
      .findOne({ _id: article_id })
      .then((article) => {
        if (article) {
          article.comments.push(newComment);
          article
            .save()
            .then((result) => res.json(result))
            .catch((error) => res.status(500).json({ error: error.message }));
        } else res.status(404).json({ error: "article doesn't exist" });
      })
      .catch((error) => res.status(500).json({ error: error.message }));
  });
};

export const likeArticle = async (req, res) => {
  const { article_id } = req.params;
  const user_id = req.user.id;

  const newLike = {
    user_id,
  };

blogModel.findOne({_id:article_id})
    .then(article=>{
        if(article)
        {
            const found = article.likes.some(el => el.user_id.toString() === user_id.toString());
            if (found) {
               article.likes=article.likes.filter(item=>item.user_id.toString()!==user_id.toString())

            }else
            {
                 article.likes.push(newLike);
            }
            article.save()
            .then(result=>res.json(result))
            .catch(error=>res.status(500).json({error:error.message}))
        }
        else res.status(404).json({error:"article doesn't exist"})
    })
    .catch(error=>res.json({error:error.message}))
};

