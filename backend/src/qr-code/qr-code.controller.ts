import { Body, Controller, Post } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @Post('generate')
  async generateQRCode(@Body() body: { type: string; data: any }) {
    const { type, data } = body;
    return {
      qrCode: await this.qrCodeService.generateQRCode(type, data),
    };
  }
}
