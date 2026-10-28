import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { LoggingInterceptor } from './common/logging.interceptor.js';

const isProduction = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: isProduction
      ? ['fatal', 'error', 'warn', 'log']
      : ['fatal', 'error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
