import dotenv from "dotenv";

dotenv.config();

interface Config {
    HTTP_PORT: number;
    HTTP_HOST: string;
    LOG_PATH: string;
    MONGO_URL: string;
    RUNTIME: "dev" | "prod";
}

const config: Config = {
    HTTP_PORT: parseInt(process.env.HTTP_PORT || "3000", 10),
    HTTP_HOST: process.env.HTTP_HOST || "localhost",
    LOG_PATH: process.env.LOG_PATH || "/var/log",
    MONGO_URL: process.env.MONGO_URL || "",
    RUNTIME: process.env.RUNTIME == "prod" ? "prod" : "dev",
};

export default config;
