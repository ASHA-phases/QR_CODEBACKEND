import { Body, Controller, Post, Res, UseGuards, UseFilters } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { Response } from 'express';
//import { AuthGuard } from '../../../infrastructure/guards/auth.guard';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @Post('generate')
 // @UseGuards(AuthGuard) // Apply AuthGuard to require authentication
  async generateQRCode(@Body() body: { type: string; data: any }) {
    const { type, data } = body;
    return {
      qrCode: await this.qrCodeService.generateQRCode(type, data),
    };
  }

  @Post('generate-png')
  //@UseGuards(AuthGuard) // Apply AuthGuard to require authentication
  async generateQRCodePNG(@Body() body: { type: string; data: any }, @Res() res: Response) {
    const { type, data } = body;
    const buffer = await this.qrCodeService.generateQRCodePNG(type, data);
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  }

  @Post('generate-svg')
  //@UseGuards(AuthGuard) // Apply AuthGuard to require authentication
  async generateQRCodeSVG(@Body() body: { type: string; data: any }, @Res() res: Response) {
    const { type, data } = body;
    const svg = await this.qrCodeService.generateQRCodeSVG(type, data);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  }

  @Post('generate-pdf')
  //@UseGuards(AuthGuard) // Apply AuthGuard to require authentication
  async generateQRCodePDF(@Body() body: { type: string; data: any }, @Res() res: Response) {
    const { type, data } = body;
    const buffer = await this.qrCodeService.generateQRCodePDF(type, data);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(buffer);
  }
}




