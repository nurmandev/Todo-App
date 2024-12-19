import { CustomError } from "./custom.error";
export declare class ArgumentValidationError extends CustomError {
    messages: string[];
    constructor(message: string, messages: string[], reasonCode?: string);
}
