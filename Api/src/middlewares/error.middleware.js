"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const errorHandlerMiddleware = (error, _req, res, _next) => {
    utils_1.Logger.error(JSON.stringify(error));
    if (error instanceof errors_1.CustomError) {
        if (error instanceof errors_1.ArgumentValidationError) {
            res.status(error.errorCode).json({
                message: error.message,
                messages: error.messages
            });
        }
        else
            res.status(error.errorCode).json({
                message: error.message,
            });
    }
    return;
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=error.middleware.js.map