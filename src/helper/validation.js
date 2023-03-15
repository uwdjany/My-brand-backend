import joi from "joi";

const articleSchema = joi.object({
  title: joi.string().min(10).required(),
  content: joi.string().min(20).required(),
});

module.exports = {
  articleSchema,
};
