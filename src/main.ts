import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swaggerConfig from './config/swagger.config';
import validationConfig from './config/validation.confit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? 'https://example.com' : '*',
    credentials: true,
  });
  validationConfig(app);
  swaggerConfig(app);
  await app.listen(process.env.PORT ?? 3300);
}
bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});
