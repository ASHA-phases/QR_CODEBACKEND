import { Module } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { QrCodeController } from './qr-code.controller';
import { QrCodeRepository } from 'src/domain/repositories/qr-code.repository';

@Module({
  controllers: [QrCodeController],
  providers: [QrCodeService, QrCodeRepository],
})
export class QrCodeModule {}
