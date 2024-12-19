"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const validators_1 = require("../validators");
const controllers_1 = require("../controllers");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/register", validators_1.AuthValidator.registerValidator(), controllers_1.AuthController.registerController);
exports.authRouter.post("/login", validators_1.AuthValidator.loginValidator(), controllers_1.AuthController.loginController);
//# sourceMappingURL=authRouter.js.map