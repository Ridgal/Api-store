import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import configuration from './_core/config/configuration';

const config = configuration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  // Global prefix
  app.setGlobalPrefix(config.app.globalPrefix);

  // Config cors
  app.enableCors();

  await app.listen(config.app.port);
}

bootstrap();
