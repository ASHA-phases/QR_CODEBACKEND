import { Module } from '@nestjs/common';
import { QrCodeGatewayModule } from './api-gateway/qr-code.gateway';

/**
 * The root module of the application.
 * 
 * The `AppModule` is the entry point of the application and imports other modules
 * that are necessary for the application to function.
 */
@Module({
  imports: [QrCodeGatewayModule],
})
export class AppModule {}
