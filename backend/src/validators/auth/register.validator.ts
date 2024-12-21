import { body } from "express-validator";

export const registerValidator = () => {
  return [
    body("name").notEmpty().withMessage("Name is required."),
    body("email").notEmpty().withMessage("Email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ];
};
