import { DocumentBuilder } from "@nestjs/swagger";
import { version } from 'package.json';


export const swaggerConfig = new DocumentBuilder()
  .setTitle('Store API')
  .setVersion(version)
  .build();