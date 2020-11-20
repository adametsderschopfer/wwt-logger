const Logger = require("./dist/Logger");
const ExpressLogger = require("./dist/plugins/module-express");

exports.ExpressLogger = ExpressLogger.default
exports.Logger = Logger.default;


