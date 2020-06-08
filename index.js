/*
 * Custom Logger library
 *
 * BY Vladislav Adamets <AV.STYLEDEV@GMAIL.COM>
 * GITHUB: https://github.com/adametsofficial
 */

// modules
const { fs, path } = require("./src/_modules");

// module
class ILLog {
  #config = {
    path: "",
    action: "",
    fileName: "",
  };

  #dir = this.#config.path;

  constructor(config) {
    this.#config = config;
    this.#dir = this.#config.path + "\\" + "logs";

    let _dir = [...this.#config.path.split("\\")];
    _dir = _dir.map((i) => {
      if (i === "logs" || i === "Logs") {
        i = "";
      }
      return i;
    });
    _dir = _dir.reduce((a, b) => a + "\\" + b);

    fs.stat(_dir + "\\" + "logs", (error) => {
      if (error) {
        fs.mkdir(_dir + "\\" + "logs", (err) => {
          if (err) throw err;
          this.#dir = _dir + "\\" + "logs";
        });
      }
      this.#dir = _dir + "\\" + "logs";
    });
  }

  async readLogFile(_path) {
    const fileread = new Promise((res, rej) => {
      fs.readFile(_path, "utf-8", (err, data) => {
        if (err) return rej(err);

        return res(Buffer.from(data).toString());
      });
    });
    return await fileread;
  }

  async writeLogfile(content, status, filename) {
    if (!status) status = "INFO";

    if (!filename) {
      return;
    }

    return new Promise((res, rej) => {
      if (!content) {
        return rej("Don't have a text, please write a log text");
      }

      return this.readLogFile(this.#dir + "\\" + filename + ".log")
        .then(() => {
          fs.appendFile(
            this.#dir + "\\" + filename + ".log",
            `{${status}}: |${content}|, [${new Date().toUTCString()}]${
              this.#config.action && ` (ACT.: ${this.#config.action})`
            };\n`,
            (error) => {
              if (error) throw rej(error);
              res();
            }
          );
        })
        .catch(() => {
          fs.writeFile(this.#dir + "\\" + filename + ".log", "", () => {
            this.writeLogfile();
            res();
          });
        });
    });
  }

  async error(content) {
    return await this.writeLogfile(content, "ERROR", "errors");
  }

  async info(content) {
    return await this.writeLogfile(content, "INFO", "info");
  }

  async warning(content) {
    return await this.writeLogfile(content, "WARNING", "warnings");
  }

  async debug(content) {
    return await this.writeLogfile(content, "DEBUG", "debugs");
  }

  async fatal(content) {
    return await this.writeLogfile(content, "FATAL", "fatals");
  }

  async removeLogDirecroty() {
    return new Promise((res, rej) => {
      return fs.rmdir(this.#config.path + "\\" + "logs", (err) => {
        if (err) rej(err);
        res();
      });
    });
  }
}

// const logger = new ILLog({
//   path: "./src",
//   action: "NEW POST",
// });
