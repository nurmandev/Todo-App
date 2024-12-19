"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentValidationError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const custom_error_1 = require("./custom.error");
class ArgumentValidationError extends custom_error_1.CustomError {
    constructor(message, messages, reasonCode) {
        super(message, http_status_1.default.BAD_REQUEST, reasonCode);
        this.messages = messages;
    }
}
exports.ArgumentValidationError = ArgumentValidationError;
//# sourceMappingURL=argumentValidation.error.js.map