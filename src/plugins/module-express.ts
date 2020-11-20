import Logger from "../Logger"
import { Request, Response, NextFunction } from "express"
import { LoggerConfig } from "../types"

interface RequestWithLogger extends Request {
  logger?: Logger
}

export function ExpressLogger(config: LoggerConfig) {
  return (req: RequestWithLogger, res: Response, next: NextFunction) =>  {
    req.logger = new Logger(config)
    return next()
  }
}