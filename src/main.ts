import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = Number.parseInt(process.env.npm_config_port) || config.get<number>('PORT')  || 3000;

  app.enableCors();
  app.enableVersioning();
  app.setGlobalPrefix('api');
  
  await app.listen(port, () => {
    new Logger('NestApplication').log(`Server is running on : http://localhost:` + port);
  });
}
bootstrap();