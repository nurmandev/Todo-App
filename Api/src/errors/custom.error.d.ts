export declare class CustomError extends Error {
    errorCode: number;
    reasonCode?: string;
    constructor(message: string, errorCode?: number, reasonCode?: string);
}
