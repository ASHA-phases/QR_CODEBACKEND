import { Module } from '@nestjs/common';
import { QrCodeModule } from './modules/qr-code/qr-code.module';

@Module({
  imports: [QrCodeModule],
})
export class QrCodeGatewayModule {}
