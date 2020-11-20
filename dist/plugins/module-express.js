"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../Logger"));
function ExpressLogger(config) {
    return (req, res, next) => {
        req.logger = new Logger_1.default(config);
        return next();
    };
}
exports.default = ExpressLogger;
