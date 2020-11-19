import { TContent, PathLike, ErrorCb } from "./types";
export interface ILogger {
    get?: (path: PathLike, callback: (error: ErrorCb, content: TContent) => void) => void;
    set?: (logCode: string, content: TContent, callBack: (error: ErrorCb) => void) => void;
}
