/**
 * Copyright (c) 2018 Centroida.AI All rights reserved.
 */

import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
dotenv.config({ path: ".env" });
const winston = require("winston");
require("winston-daily-rotate-file");
const LOGGER_CONFIG = require("../../logging.config.json")["config"];

export namespace Logger {
    if (!process.env.NODE_ENV) {
        throw new Error("Specify NODE_ENV in environment variables!");
    }

    function getCurrentDate() {
        return (new Date()).toUTCString();
    }

    function createLogsFolder(filePath: string) {
        const folder = path.dirname(filePath);

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    }

    function createTransport(config: any) {
        if (config["type"] === "console") {
            return new (winston.transports.Console)({
                timestamp: getCurrentDate(),
                datePattern: "yyyy-MM-dd-HH:mm",
                colorize: true,
                level: config["level"]
            });
        } else {
            createLogsFolder(config["filename"]);
            return new (winston.transports.DailyRotateFile)({
                name: `file#${config["level"]}`,
                filename: config["filename"],
                timestamp: getCurrentDate(),
                datePattern: "yyyy-MM-dd",
                prepend: true,
                level: config["level"]
            });
        }
    }

    const TRANSPORTS: any = [];

    for (const transportConfig of LOGGER_CONFIG[process.env.NODE_ENV]["transports"]) {
        TRANSPORTS.push(createTransport(transportConfig));
    }

    const logger = new (winston.Logger)({
        transports: TRANSPORTS
    });

    export function info(msg: string) {
        return logger.info(msg);
    }

    export function debug(msg: string) {
        return logger.debug(msg);
    }

    export function verbose(msg: string) {
        return logger.verbose(msg);
    }

    export function warn(msg: string) {
        return logger.warn(msg);
    }

    export function error(msg: any) {
        return logger.error(msg);
    }
}
