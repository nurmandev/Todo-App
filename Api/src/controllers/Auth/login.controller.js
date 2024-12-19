"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const services_1 = require("../../services");
const utils_1 = require("../../utils");
const generate_1 = require("../../utils/generate");
const password_1 = require("../../utils/password");
const http_status_1 = __importDefault(require("http-status"));
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const findUser = yield services_1.userService.getOneUser({ email });
    if (!findUser)
        return null;
    if (findUser.deletedAt)
        return null;
    const compare = yield (0, password_1.comparePassword)(password, findUser.password);
    if (!compare)
        return null;
    const token = (0, generate_1.generateToken)(findUser.userId);
    res.json({ token, user: findUser }).status(http_status_1.default.ACCEPTED);
});
exports.loginController = (0, utils_1.errorHandlerWrapper)(loginHandler);
//# sourceMappingURL=login.controller.js.map