import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * The main function to bootstrap the NestJS application.
 * 
 * This function initializes the NestJS application, enables CORS (Cross-Origin Resource Sharing),
 * and sets the application to listen on a specified port.
 */
async function bootstrap() {
  // Create an instance of the NestJS application using the AppModule
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS to allow requests from different origins
  app.enableCors(); 

  // Start the application and have it listen on port 4000
  await app.listen(4000);
}

// Call the bootstrap function to start the application
bootstrap();
