import { Injectable } from '@nestjs/common';
import { QrCodeRepository } from 'src/domain/repositories/qr-code.repository';

@Injectable()
export class QrCodeService {
  constructor(private readonly qrCodeRepository: QrCodeRepository) {}

  async generateQRCode(type: string, data: any): Promise<string> {
    return this.qrCodeRepository.generateQRCode(type, data);
  }

  async generateQRCodePNG(type: string, data: any): Promise<Buffer> {
    return this.qrCodeRepository.generateQRCodePNG(type, data);
  }

  async generateQRCodeSVG(type: string, data: any): Promise<string> {
    return this.qrCodeRepository.generateQRCodeSVG(type, data);
  }

  async generateQRCodePDF(type: string, data: any): Promise<Buffer> {
    return this.qrCodeRepository.generateQRCodePDF(type, data);
  }
}
