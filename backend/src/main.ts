import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    methods: '*',
    allowedHeaders: '*',
  })
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<number>('port') || 8000;
  await app.listen(port);
}
bootstrap();
