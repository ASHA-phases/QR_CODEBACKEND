import { Module } from '@nestjs/common';
import { QrCodeGatewayModule } from './api-gateway/qr-code.gateway';

@Module({
  imports: [QrCodeGatewayModule],
})
export class AppModule {}
