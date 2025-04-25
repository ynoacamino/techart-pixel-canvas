import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: configuration().frontendUrl,
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  });

  const configService: ConfigService = app.get(ConfigService);
  const apiPort = configService.get<number>('port') ?? 8080;
  await app.listen(apiPort);
}
bootstrap();
