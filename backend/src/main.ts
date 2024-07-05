import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Optionally enable CORS
  await app.listen(4000); // Change port to 4000 or any other available port
}
bootstrap();
