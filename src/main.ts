import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // somewhere in your initialization file
  app.use(compression());
  app.use(helmet());




  await app.listen(3000);
  Logger.debug(`Server running on http://localhost:3000`, 'Bootstrap');
}
bootstrap();
