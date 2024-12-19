"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
const registerValidator = () => {
    return [
        (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required."),
        (0, express_validator_1.body)("email")
            .notEmpty()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Email is invalid."),
        (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required."),
    ];
};
exports.registerValidator = registerValidator;
//# sourceMappingURL=register.validator.js.map