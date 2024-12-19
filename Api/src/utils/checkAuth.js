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
exports.checkAuth = void 0;
const env_1 = require("../env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../services");
const unauthorized_error_1 = require("../errors/unauthorized.error");
const checkAuth = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const { secretKey } = env_1.Env;
        const { id } = jsonwebtoken_1.default.verify(token, secretKey);
        const user = yield services_1.userService.getOneUser({ userId: id });
        req.user = Object.assign({}, user);
        next();
    }
    catch (_a) {
        next(new unauthorized_error_1.UnauthorizedError("Token is invalid"));
    }
});
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map