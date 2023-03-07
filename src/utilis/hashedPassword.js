import bcrypt from "bcrypt";
import "dotenv/config";

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export const isPasswordMatching = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};