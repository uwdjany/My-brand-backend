import { check, validationResult } from "express-validator";
//import status from "http-status";
export const validateInput = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.errors.map((err) => err.msg);
      return res.status(400).json({
        status: 400,
        message: errorMessage,
      });
    }
    return next();
  } catch (error) {
    console(error);
  }
};
export const newCreationRules = () => {
  return [
    check("email", "please Your email is Invalid ").isEmail(),
    check(
      "firstName",
      "please Your first name have special character"
    ).isAlpha(),
    check("lastName", "please Your last name have special character").isAlpha(),
    check("password", "password must be strong").isStrongPassword(),
  ];
};
