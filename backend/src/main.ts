import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: "*",
    methods: '*',
    allowedHeaders: '*',
  })

  const configService: ConfigService = app.get(ConfigService);
  const apiPort = configService.get<number>('port') ?? 8080;
  await app.listen(apiPort);
}
bootstrap();
