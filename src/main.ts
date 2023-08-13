import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

import { swaggerConfig } from './_core/common';
import configuration from './_core/config/configuration';

const config = configuration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  // Global prefix
  app.setGlobalPrefix(config.app.globalPrefix);

  // Config cors
  app.enableCors();

  // Init swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(config.app.port);
};

bootstrap();
