import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('BACKEND_PORT', 8000);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  //app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`Application started on port ${port}!`);
}
bootstrap();
