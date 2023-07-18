import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule } from '@nestjs/swagger';

import configuration from './_core/config/configuration';
import { swaggerConfig } from './_core/common';
import { resolve } from 'path';

const config = configuration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  // Global prefix
  app.setGlobalPrefix(config.app.globalPrefix);

  // Config cors
  app.enableCors();

  // Init swagger
  if (config.app.isActiveSwagger) {
    SwaggerModule.setup(
      resolve(config.app.globalPrefix, 'swagger'),
      app,
      SwaggerModule.createDocument(app, swaggerConfig),
    );
  };

  await app.listen(config.app.port);
};

bootstrap();
