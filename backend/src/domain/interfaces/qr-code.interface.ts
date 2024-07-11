export interface IQrCodeRepository {
    generateQRCode(type: string, data: any): Promise<string>;
    generateQRCodePNG(type: string, data: any): Promise<Buffer>;
    generateQRCodeSVG(type: string, data: any): Promise<string>;
    generateQRCodePDF(type: string, data: any): Promise<Buffer>;
  }

  export interface QRCodeDTO {
    type: string;
    data: any;
  }
  