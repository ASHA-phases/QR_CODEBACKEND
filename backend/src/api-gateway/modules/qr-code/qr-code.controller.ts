import { Body, Controller, Post, Res } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { Response } from 'express';

/**
 * Controller that handles QR code generation requests.
 * 
 * The `QrCodeController` class defines endpoints for generating QR codes in different formats
 * (base64, PNG, SVG, and PDF) and delegates the processing to the `QrCodeService`.
 */
@Controller('qr-code')
export class QrCodeController {
  /**
   * The constructor injects the `QrCodeService` to use its methods for generating QR codes.
   * 
   * @param {QrCodeService} qrCodeService - The service that contains the business logic for QR code generation.
   */
  constructor(private readonly qrCodeService: QrCodeService) {}

  /**
   * Handles POST requests to generate a QR code in base64 format.
   * 
   * @param {Object} body - The request body containing the type and data for the QR code.
   * @param {string} body.type - The type of QR code to generate.
   * @param {any} body.data - The data to encode in the QR code.
   * @returns {Promise<Object>} - An object containing the base64 encoded QR code.
   */
  @Post('generate')
  async generateQRCode(@Body() body: { type: string; data: any }) {
    const { type, data } = body;
    return {
      qrCode: await this.qrCodeService.generateQRCode(type, data),
    };
  }

  /**
   * Handles POST requests to generate a QR code in PNG format and sends it as a response.
   * 
   * @param {Object} body - The request body containing the type and data for the QR code.
   * @param {string} body.type - The type of QR code to generate.
   * @param {any} body.data - The data to encode in the QR code.
   * @param {Response} res - The response object to send the PNG file.
   */
  @Post('generate-png')
  async generateQRCodePNG(@Body() body: { type: string; data: any }, @Res() res: Response) {
    const { type, data } = body;
    const buffer = await this.qrCodeService.generateQRCodePNG(type, data);
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  }

  /**
   * Handles POST requests to generate a QR code in SVG format and sends it as a response.
   * 
   * @param {Object} body - The request body containing the type and data for the QR code.
   * @param {string} body.type - The type of QR code to generate.
   * @param {any} body.data - The data to encode in the QR code.
   * @param {Response} res - The response object to send the SVG file.
   */
  @Post('generate-svg')
  async generateQRCodeSVG(@Body() body: { type: string; data: any }, @Res() res: Response) {
    const { type, data } = body;
    const svg = await this.qrCodeService.generateQRCodeSVG(type, data);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  }

  /**
   * Handles POST requests to generate a QR code in PDF format and sends it as a response.
   * 
   * @param {Object} body - The request body containing the type and data for the QR code.
   * @param {string} body.type - The type of QR code to generate.
   * @param {any} body.data - The data to encode in the QR code.
   * @param {Response} res - The response object to send the PDF file.
   */
  @Post('generate-pdf')
  async generateQRCodePDF(@Body() body: { type: string; data: any }, @Res() res: Response) {
    const { type, data } = body;
    const buffer = await this.qrCodeService.generateQRCodePDF(type, data);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(buffer);
  }
}
