import { Injectable } from '@nestjs/common';
import { QrCodeRepository } from 'src/domain/repositories/qr-code.repository';

/**
 * Service that handles QR code generation logic.
 * 
 * The `QrCodeService` class provides methods for generating QR codes in different formats
 * by delegating the actual generation to the `QrCodeRepository`.
 */
@Injectable()
export class QrCodeService {
  /**
   * The constructor injects the `QrCodeRepository` to use its methods for generating QR codes.
   * 
   * @param {QrCodeRepository} qrCodeRepository - The repository that handles QR code generation.
   */
  constructor(private readonly qrCodeRepository: QrCodeRepository) {}

  /**
   * Generates a QR code in base64 format.
   * 
   * @param {string} type - The type of QR code to generate.
   * @param {any} data - The data to encode in the QR code.
   * @returns {Promise<string>} - A promise that resolves to the base64 encoded QR code.
   */
  async generateQRCode(type: string, data: any): Promise<string> {
    return this.qrCodeRepository.generateQRCode(type, data);
  }

  /**
   * Generates a QR code in PNG format.
   * 
   * @param {string} type - The type of QR code to generate.
   * @param {any} data - The data to encode in the QR code.
   * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the PNG file.
   */
  async generateQRCodePNG(type: string, data: any): Promise<Buffer> {
    return this.qrCodeRepository.generateQRCodePNG(type, data);
  }

  /**
   * Generates a QR code in SVG format.
   * 
   * @param {string} type - The type of QR code to generate.
   * @param {any} data - The data to encode in the QR code.
   * @returns {Promise<string>} - A promise that resolves to a string containing the SVG file.
   */
  async generateQRCodeSVG(type: string, data: any): Promise<string> {
    return this.qrCodeRepository.generateQRCodeSVG(type, data);
  }

  /**
   * Generates a QR code in PDF format.
   * 
   * @param {string} type - The type of QR code to generate.
   * @param {any} data - The data to encode in the QR code.
   * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the PDF file.
   */
  async generateQRCodePDF(type: string, data: any): Promise<Buffer> {
    return this.qrCodeRepository.generateQRCodePDF(type, data);
  }
}
