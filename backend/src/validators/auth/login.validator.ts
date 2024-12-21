import { body } from "express-validator";

export const loginValidator = () => {
  return [
    body("email").exists().withMessage("Email is required."),
    body("password").exists().withMessage("Password is required."),
  ];
};
