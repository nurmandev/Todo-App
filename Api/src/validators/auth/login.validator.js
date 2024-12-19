"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
const loginValidator = () => {
    return [
        (0, express_validator_1.body)("email")
            .exists()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Email is invalid."),
        (0, express_validator_1.body)("password").exists().withMessage("Password is required."),
    ];
};
exports.loginValidator = loginValidator;
//# sourceMappingURL=login.validator.js.map