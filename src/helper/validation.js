import joi from "joi";

const articleSchema = joi.object({
  title: joi.string().min(10).required(),
  author:joi.string().min(5).required(),
  date:joi.string().min(3).required(),
  content: joi.string().min(20).required(),
});

module.exports = {
  articleSchema,
};
