import { config } from "dotenv";
import { ApplicationConfigurations } from "./types";

config();

export default (): ApplicationConfigurations => {
  const config = {
    database: {
      host: process.env.APP_DB_HOST,
      port: +process.env.APP_DB_PORT,
      user: process.env.APP_DB_USER,
      password: process.env.APP_DB_PASSWORD,
      name: process.env.APP_DB_NAME,
    },
    app: {
      port: +process.env.APP_PORT,
      globalPrefix: process.env.APP_GLOBAL_PREFIX,
    },
    auth: {
      jwtAccessSecret: process.env.APP_JWT_ACCESS_SECRET,
      jwtRefreshSecret: process.env.APP_JWT_REFRESH_SECRET,
    }
  }

  return config;
};