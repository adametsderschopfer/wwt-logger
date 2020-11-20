import Logger, { LoggerConfig } from "../Logger";
import { Request, Response, NextFunction } from "express";
interface RequestWithLogger extends Request {
    logger?: Logger;
}
export default function ExpressLogger(config: LoggerConfig): (req: RequestWithLogger, res: Response, next: NextFunction) => void;
export {};
