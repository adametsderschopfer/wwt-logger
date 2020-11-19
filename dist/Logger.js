"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Logger {
    /**
     *  If the path where the folder is not specified in the config
     *  file for writing logs, then it
     *  will automatically be created in the same directory
     *  in which it is declared.
     *
     *  config.dir => __dirname
     * */
    constructor(config = { dir: path_1.default.join(__dirname, '/logs') }) {
        this.instance = this;
        this.logType = enums_1.LogTypes;
        this.config = config;
        this.initialize();
        this.date = new Date();
    }
    async get(fileName, callBack) {
        try {
            let doneRead = await this.read(fileName);
            callBack(null, doneRead);
        }
        catch (error) {
            callBack(error, undefined);
        }
        return this.instance;
    }
    async set(logType = "INFO", content, callBack) {
        if (!this.logType.hasOwnProperty(logType)) {
            const error = new TypeError("The logType argument was not found in LogTypes, please check the types in the documentation!");
            if (callBack) {
                callBack(error);
            }
            return error;
        }
        const logTypeToLow = `${logType.toString().toLocaleLowerCase()}.log`;
        const template = this.logTemplate(logType, content);
        let isExist;
        let updatedContent = template;
        let prevContent;
        try {
            isExist = await this.checkIsExist(logTypeToLow);
        }
        catch (error) {
            if (callBack) {
                callBack(error);
            }
            throw error;
        }
        if (isExist) {
            try {
                prevContent = await this.read(logType);
                updatedContent = prevContent + template;
            }
            catch (error) {
                if (callBack) {
                    callBack(error);
                }
                throw error;
            }
        }
        fs_1.default.writeFile(`${this.config.dir}\\${logTypeToLow}`, updatedContent, (err) => {
            if (err) {
                if (callBack) {
                    callBack(err);
                }
                throw Error(err.toString());
            }
        });
        if (callBack) {
            callBack(null);
        }
        return this.instance;
    }
    /**
     * Initialization func when Logger is declared
     * */
    async initialize() {
        let isExist = await this.checkIsExist();
        if (!isExist) {
            let path = this.config.dir;
            fs_1.default.mkdir(path, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
    }
    /**
     * Method for read file
     * which return Promise where resolve return data:Budffer
     * */
    async read(fileName) {
        let pathToFile = `${this.config.dir}\\${fileName}.log`;
        return new Promise((res, rej) => {
            fs_1.default.readFile(pathToFile, "utf-8", (error, data) => {
                if (error) {
                    rej(error);
                    return;
                }
                res(data);
            });
        });
    }
    /**
     * (LogType) [(new Date.toUTCString())]: (Content)
     *
     * Example:
     * ERROR [Thu, 19 Nov 2020 19:14:58 GMT]: Something went wrong with the database connection
     * */
    logTemplate(logTypes = "INFO", content) {
        return `${logTypes} [${this.date.toUTCString()}]: ${content}\n-----------------------------------------------------------------------------------\n`;
    }
    /**
     * The checkIsExist function was created
     * to check the input directory for existence.
     *
     * checkIsExist => If this.config.dir is exist return True else if does not exist return false
     * */
    async checkIsExist(fileName) {
        return new Promise((res, rej) => {
            fs_1.default.stat(fileName ? `${this.config.dir}\\${fileName}` : this.config.dir, function (err, stats) {
                if (err) {
                    res(false);
                    console.error(`The folder or file on the path was not found, so it was created.\n${!fileName ? err.path : err.path + ".log"}`);
                    return;
                }
                res(true);
            });
        });
    }
}
const l = new Logger({
    dir: path_1.default.join(__dirname, "/logs")
});
l.set(l.logType.ERROR, "Server is die!");
exports.default = Logger;
