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
exports.registerController = void 0;
const services_1 = require("../../services");
const utils_1 = require("../../utils");
const encrypt_1 = require("../../utils/encrypt");
const http_status_1 = __importDefault(require("http-status"));
const registerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashPassword = yield (0, encrypt_1.encryptPassword)(password);
    const user = yield services_1.userService.createUser({
        name,
        email,
        password: hashPassword,
    });
    console.log(user);
    res.json({ user }).status(http_status_1.default.CREATED);
});
exports.registerController = (0, utils_1.errorHandlerWrapper)(registerHandler);
//# sourceMappingURL=register.controller.js.map