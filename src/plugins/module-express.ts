import Logger from "../Logger"
import { Request, Response, NextFunction } from "express"
import { LoggerConfig } from "../types"

interface RequestWithLogger extends Request {
  logger: Logger
}

export function ExpressLogger(config: LoggerConfig) {
  const loggerInstance: Logger = new Logger(config)

  return function (req: RequestWithLogger, res: Response, next: NextFunction) {
    req.logger.get = loggerInstance.get;
    req.logger.set = loggerInstance.set;

    return next()
  }
}