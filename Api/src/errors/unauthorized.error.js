"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const custom_error_1 = require("./custom.error");
class UnauthorizedError extends custom_error_1.CustomError {
    constructor(message, reasonCode) {
        super(message, http_status_1.default.UNAUTHORIZED, reasonCode);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=unauthorized.error.js.map