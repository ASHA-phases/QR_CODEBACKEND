import { Module } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { QrCodeController } from './qr-code.controller';
import { QrCodeRepository } from 'src/domain/repositories/qr-code.repository';

/**
 * Module that encapsulates all QR code-related functionality.
 * 
 * The `QrCodeModule` defines the controller and service for handling QR code operations,
 * and includes the repository for interacting with data storage.
 */
@Module({
  controllers: [QrCodeController],
  providers: [QrCodeService, QrCodeRepository],
})
export class QrCodeModule {}
