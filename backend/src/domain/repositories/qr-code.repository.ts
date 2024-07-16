import { Injectable } from '@nestjs/common';
import { IQrCodeRepository } from '../interfaces/qr-code.interface';
import { getQRCodeData } from '../../infrastructure/utils/qr-code.utils';
import * as QRCode from 'qrcode';
import * as PDFDocument from 'pdfkit';

/**
 * Repository class implementing methods for generating QR codes in various formats.
 * Uses 'qrcode' library for QR code generation and 'pdfkit' for PDF document generation.
 */
@Injectable()
export class QrCodeRepository implements IQrCodeRepository {
  /**
   * Generates a QR code as a base64 encoded string.
   * @param {string} type - The type of QR code to generate.
   * @param {any} data - The data to encode in the QR code.
   * @returns {Promise<string>} - A promise that resolves to a base64 encoded QR code.
   */
  async generateQRCode(type: string, data: any): Promise<string> {
    const qrCodeData = getQRCodeData(type, data);
    return QRCode.toDataURL(qrCodeData);
  }

  /**
   * Generates a QR code as a PNG image buffer.
   * @param {string} type - The type of QR code to generate.
   * @param {any} data - The data to encode in the QR code.
   * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the PNG image.
   */
  async generateQRCodePNG(type: string, data: any): Promise<Buffer> {
    const qrCodeData = getQRCodeData(type, data);
    return QRCode.toBuffer(qrCodeData);
  }

  /**
   * Generates a QR code as an SVG string.
   * @param {string} type - The type of QR code to generate.
   * @param {any} data - The data to encode in the QR code.
   * @returns {Promise<string>} - A promise that resolves to a string containing the SVG image.
   */
  async generateQRCodeSVG(type: string, data: any): Promise<string> {
    const qrCodeData = getQRCodeData(type, data);
    return QRCode.toString(qrCodeData, { type: 'svg' });
  }

  /**
   * Generates a QR code embedded in a PDF document and returns the PDF as a buffer.
   * @param {string} type - The type of QR code to generate.
   * @param {any} data - The data to encode in the QR code.
   * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the generated PDF.
   */
  async generateQRCodePDF(type: string, data: any): Promise<Buffer> {
    // Generate QR code data based on type and input data
    const qrCodeData = getQRCodeData(type, data);
    const buffer = await QRCode.toBuffer(qrCodeData);
  
    return new Promise((resolve, reject) => {
      // Create a new PDF document instance
      const doc = new PDFDocument();
      let buffers: Buffer[] = [];
  
      // Event listeners for the PDF document
      doc.on('data', (chunk) => buffers.push(chunk)); // Collect document chunks
      doc.on('end', () => resolve(Buffer.concat(buffers))); // Resolve with concatenated buffer on document end
      doc.on('error', (err) => reject(err)); // Reject promise on document error
  
      // Embed the QR code image into the PDF document
      doc.image(buffer, {
        fit: [250, 300],      // Fit QR code image within specified dimensions
        align: 'center',      // Center align the QR code image horizontally
        valign: 'center',     // Center align the QR code image vertically
      });
  
      // Finalize and end the PDF document
      doc.end();
    });
  }
}
