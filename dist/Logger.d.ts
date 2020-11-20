/// <reference types="node" />
declare type PathLike = string | Buffer | URL;
export declare type LoggerConfig = {
    dir: PathLike;
};
declare type TContent = string | Buffer | undefined;
declare type ErrorCb = NodeJS.ErrnoException | null;
interface ILogger {
    get?: (path: PathLike, callback: (error: ErrorCb, content: TContent) => void) => void;
    set?: (logCode: string, content: TContent, callBack: (error: ErrorCb) => void) => void;
}
declare class Logger implements ILogger {
    private config;
    private date;
    private instance;
    readonly logType: typeof LogTypes;
    /**
     *  If the path where the folder is not specified in the config
     *  file for writing logs, then it
     *  will automatically be created in the same directory
     *  in which it is declared.
     *
     *  config.dir => __dirname
     * */
    constructor(config: LoggerConfig);
    get(fileName: PathLike, callBack: (error: ErrorCb, data: TContent) => void): Promise<Logger>;
    set(logType: string | undefined, content: TContent, callBack?: (error: ErrorCb) => void): Promise<Logger | TypeError>;
    /**
     * Initialization func when Logger is declared
     * */
    private initialize;
    /**
     * Method for read file
     * which return Promise where resolve return data:Budffer
     * */
    private read;
    /**
     * (LogType) [(new Date.toUTCString())]: (Content)
     *
     * Example:
     * ERROR [Thu, 19 Nov 2020 19:14:58 GMT]: Something went wrong with the database connection
     * */
    private logTemplate;
    /**
     * The checkIsExist function was created
     * to check the input directory for existence.
     *
     * checkIsExist => If this.config.dir is exist return True else if does not exist return false
     * */
    private checkIsExist;
}
declare enum LogTypes {
    ERROR = "ERROR",
    INFO = "INFO",
    WARNING = "WARNING",
    DEBUG = "DEBUG",
    FATAL = "FATAL"
}
export default Logger;
