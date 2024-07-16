import { Module } from '@nestjs/common';
import { QrCodeModule } from './modules/qr-code/qr-code.module';

/**
 * Module that serves as the gateway for QR code-related functionality.
 * 
 * The `QrCodeGatewayModule` imports and aggregates all QR code-related modules and functionalities,
 * serving as a central point for QR code operations.
 */
@Module({
  imports: [QrCodeModule],
})
export class QrCodeGatewayModule {}
