import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? 'https://example.com' : '*',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3300);
}
bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});
