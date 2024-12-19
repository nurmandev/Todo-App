"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const env_1 = require("../env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (uuid) => {
    const { secretKey, expiresIn } = env_1.Env;
    return `Bearer ${jsonwebtoken_1.default.sign({ uuid }, secretKey || "express", { expiresIn })}`;
};
exports.generateToken = generateToken;
//# sourceMappingURL=generate.js.map