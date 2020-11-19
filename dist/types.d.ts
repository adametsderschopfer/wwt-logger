/// <reference types="node" />
export declare type PathLike = string | Buffer | URL;
export declare type LoggerConfig = {
    dir: PathLike;
};
export declare type TContent = string | Buffer | undefined;
export declare type ErrorCb = NodeJS.ErrnoException | null;
