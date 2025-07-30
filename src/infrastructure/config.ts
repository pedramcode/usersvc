import dotenv from "dotenv";

dotenv.config();

interface Config {
    HTTP_PORT: number;
    HTTP_HOST: string;
    LOG_PATH: string;
    MONGO_URL: string;
    RUNTIME: "dev" | "prod";
    SECRET: string;
    REDIS_URL: string;
}

const config: Config = {
    HTTP_PORT: parseInt(process.env.HTTP_PORT || "3000", 10),
    HTTP_HOST: process.env.HTTP_HOST || "localhost",
    LOG_PATH: process.env.LOG_PATH || "/var/log",
    MONGO_URL: process.env.MONGO_URL || "",
    RUNTIME: process.env.RUNTIME == "prod" ? "prod" : "dev",
    SECRET: process.env.MONGO_URL || "",
    REDIS_URL: process.env.REDIS_URL || "",
};

export default config;
