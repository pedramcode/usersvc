import winston from "winston";
import config from "./config";

const logger = winston.createLogger({
    defaultMeta: {
        time: new Date(),
    },
    level: config.RUNTIME == "dev" ? "debug" : "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            dirname: config.LOG_PATH,
            filename: "usersvc.log",
        }),
    ],
});

export default logger;
