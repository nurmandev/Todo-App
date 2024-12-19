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
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerWrapper = void 0;
const errors_1 = require("../errors");
const express_validator_1 = require("express-validator");
const errorHandlerWrapper = (func) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new errors_1.ArgumentValidationError("Arguments are invalid.", errors.array().map((error) => error.msg));
            }
            yield func(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });
};
exports.errorHandlerWrapper = errorHandlerWrapper;
//# sourceMappingURL=errorHandler.js.map