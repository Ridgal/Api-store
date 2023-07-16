export interface ApplicationConfigurations {
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
  app: {
    port: number;
    globalPrefix: string;
  };
  auth: {
    jwtAccessSecret: string,
    jwtRefreshSecret: string,
  }
}