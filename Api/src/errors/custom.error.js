"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const http_status_1 = __importDefault(require("http-status"));
class CustomError extends Error {
    constructor(message, errorCode = http_status_1.default.BAD_REQUEST, reasonCode) {
        super();
        this.message = message;
        this.errorCode = errorCode;
        this.errorCode = errorCode;
        this.reasonCode = reasonCode;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom.error.js.map