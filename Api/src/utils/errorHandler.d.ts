import { NextFunction, Response, Request } from "express";
export declare const errorHandlerWrapper: (func: (req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
