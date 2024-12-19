"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTitleValidator = void 0;
const express_validator_1 = require("express-validator");
const createTitleValidator = () => {
    return [(0, express_validator_1.body)("title").exists().withMessage("Title is required.")];
};
exports.createTitleValidator = createTitleValidator;
//# sourceMappingURL=createTitle.validator.js.map