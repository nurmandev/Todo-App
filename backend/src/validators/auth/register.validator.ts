import { body } from "express-validator";

export const registerValidator = () => {
  return [
    body("email").notEmpty().withMessage("user Name is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ];
};
