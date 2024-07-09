import { Body, Controller, Post, Res,UploadedFile, UseInterceptors } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Express } from 'express';

 
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
 
  @Post('generate-png')
  async generateQRCodePNG(@Body() body: { type: string; data: any }, @Res() res: Response) {
    const { type, data } = body;
    const buffer = await this.qrCodeService.generateQRCodePNG(type, data);
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  }
 
  @Post('generate-svg')
  async generateQRCodeSVG(@Body() body: { type: string; data: any }, @Res() res: Response) {
    const { type, data } = body;
    const svg = await this.qrCodeService.generateQRCodeSVG(type, data);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  }
 
  @Post('generate-pdf')
  async generateQRCodePDF(@Body() body: { type: string; data: any }, @Res() res: Response) {
    const { type, data } = body;
    const buffer = await this.qrCodeService.generateQRCodePDF(type, data);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(buffer);
  }
  @Post('upload-pdf')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  uploadPDF(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = `http://localhost:4000/uploads/${file.filename}`;
    return { fileUrl };
  }
}
  
