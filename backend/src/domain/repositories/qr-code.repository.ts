import { Injectable } from '@nestjs/common';
import { IQrCodeRepository } from '../interfaces/qr-code.interface';
import { getQRCodeData } from '../../infrastructure/utils/qr-code.utils';
import * as QRCode from 'qrcode';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class QrCodeRepository implements IQrCodeRepository {
  async generateQRCode(type: string, data: any): Promise<string> {
    const qrCodeData = getQRCodeData(type, data);
    return await QRCode.toDataURL(qrCodeData);
  }

  async generateQRCodePNG(type: string, data: any): Promise<Buffer> {
    const qrCodeData = getQRCodeData(type, data);
    return await QRCode.toBuffer(qrCodeData);
  }

  async generateQRCodeSVG(type: string, data: any): Promise<string> {
    const qrCodeData = getQRCodeData(type, data);
    return await QRCode.toString(qrCodeData, { type: 'svg' });
  }

  async generateQRCodePDF(type: string, data: any): Promise<Buffer> {
    const qrCodeData = getQRCodeData(type, data);
    const buffer = await QRCode.toBuffer(qrCodeData);

    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, 'qr-code.pdf');
    const writeStream = fs.createWriteStream(pdfPath);

    doc.pipe(writeStream);
    doc.image(buffer, {
      fit: [250, 300],
      align: 'center',
      valign: 'center',
    });
    doc.end();

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        resolve(fs.readFileSync(pdfPath));
      });
      writeStream.on('error', (err) => {
        reject(err);
      });
    });
  }
}
