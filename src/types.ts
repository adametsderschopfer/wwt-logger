import { LogTypes } from "./enums";

export type PathLike = string | Buffer | URL
export type LoggerConfig = {
  dir: PathLike,
}
export type TContent = string | Buffer | undefined; 
export type ErrorCb = NodeJS.ErrnoException | null;
