import { ILogger } from './interfaces';
import { ErrorCb, LoggerConfig, PathLike, TContent } from './types';
import { LogTypes } from "./enums"

import { Stats } from 'fs';
import path from 'path';
import fs from 'fs';

class Logger implements ILogger {
  private config: LoggerConfig;
  private date: Date
  private instance: Logger = this;

  public readonly logType = LogTypes;

  /**
   *  If the path where the folder is not specified in the config
   *  file for writing logs, then it
   *  will automatically be created in the same directory
   *  in which it is declared.
   * 
   *  config.dir => __dirname
   * */
  public constructor(config: LoggerConfig = { dir: path.join(__dirname, '/logs') }) {
    this.config = config;
    this.initialize();

    this.date = new Date();
  }

  public async get(fileName: PathLike, callBack: (error: ErrorCb, data: TContent) => void) {
    try {
      let doneRead = await this.read(fileName)

      callBack(null, doneRead)
    } catch (error) {
      callBack(error, undefined)
    }
    
    return this.instance
  }

  public async set(logType: string = "INFO", content: TContent, callBack?: (error: ErrorCb) => void) {
    const template = this.logTemplate(logType, content)
    const isExist = await this.checkDirectoryExist(logType.toString().toLocaleLowerCase())
    
    console.log(isExist);
    

    return this.instance
  }

  /**
   * Initialization func when Logger is declared 
   * */
  private async initialize() { 
    let isExist = await this.checkDirectoryExist()

    if (!isExist) {
      let path = this.config.dir;

      fs.mkdir(path, (err) => {
        if (err) {
          throw err;
        }
      })
    }
  }

  /**
   * Method for read file
   * which return Promise where resolve return data:Budffer
   * */
  private async read(fileName: PathLike): Promise<TContent> {
    let pathToFile = `${this.config.dir}\\${fileName}.log`
    
    return new Promise((res, rej) => {
      fs.readFile(pathToFile, "utf-8", (error: ErrorCb, data: TContent) => {
        if (error) {
          rej(error)

          return 
        }

        res(data)
      })
    })
  }

  /**
   * (LogType) [(new Date.toUTCString())]: (Content) 
   * 
   * Example: 
   * ERROR [Thu, 19 Nov 2020 19:14:58 GMT]: Something went wrong with the database connection
   * */  
  private logTemplate (logTypes: string = "INFO", content: TContent) {
    return `${logTypes} [${this.date.toUTCString()}]: ${content} `
  } 

  /**
   * The checkDirectoryExist function was created
   * to check the input directory for existence.
   * 
   * checkDirectoryExist => If this.config.dir is exist return True else if does not exist return false
   * */ 
  private async checkDirectoryExist(fileName?: PathLike): Promise<boolean> {
    return new Promise((res, rej) => {      
      fs.stat(fileName ? `${this.config.dir}/${fileName}` : this.config.dir  , function (err: ErrorCb, stats: Stats) {
        if (err) {
          res(false)
          
          console.error(`The folder or file on the path was not found, so it was created.\n${!fileName ? err.path : err.path + ".log"}`);
          return; 
        } 
        
        res(true)
      })
    })
  }    
} 

const l = new Logger({
  dir: path.join(__dirname, "/logs")
})

  l.set(l.logType.FATAL, "Server is die!")

export default Logger;