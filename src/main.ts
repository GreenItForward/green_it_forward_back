import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = Number.parseInt(process.env.PORT) || config.get<number>('PORT') || 3000;

  app.enableCors();
  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  
  await app.listen(port, () => {
    new Logger('NestApplication').log(`Server is running on : http://localhost:` + port);
  });
  
}
bootstrap();