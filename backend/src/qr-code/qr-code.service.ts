import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class QrCodeService {
  async generateQRCode(type: string, data: any): Promise<string> {
    try {
      const qrCodeData = this.getQRCodeData(type, data);
      return await QRCode.toDataURL(qrCodeData);
    } catch (error) {
      console.error('Error generating QR code', error);
      throw new Error('Error generating QR code');
    }
  }

  async generateQRCodePNG(type: string, data: any): Promise<Buffer> {
    try {
      const qrCodeData = this.getQRCodeData(type, data);
      return await QRCode.toBuffer(qrCodeData);
    } catch (error) {
      console.error('Error generating PNG QR code', error);
      throw new Error('Error generating PNG QR code');
    }
  }

  async generateQRCodeSVG(type: string, data: any): Promise<string> {
    try {
      const qrCodeData = this.getQRCodeData(type, data);
      return await QRCode.toString(qrCodeData, { type: 'svg' });
    } catch (error) {
      console.error('Error generating SVG QR code', error);
      throw new Error('Error generating SVG QR code');
    }
  }

  async generateQRCodePDF(type: string, data: any): Promise<Buffer> {
    try {
      const qrCodeData = this.getQRCodeData(type, data);
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
    } catch (error) {
      console.error('Error generating PDF QR code', error);
      throw new Error('Error generating PDF QR code');
    }
  }

  private getQRCodeData(type: string, data: any): string {
    let qrCodeData: string;

    switch (type) {
      case 'Link':
        qrCodeData = data.url;
        break;
      case 'Email':
        qrCodeData = `mailto:${data.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.message)}`;
        break;
      case 'Text':
        qrCodeData = data.text;
        break;
      case 'Call':
        qrCodeData = `tel:${data.countryCode}${data.phoneNumber}`;
        break;
      case 'Sms':
        if (!data.countryCode || !data.phoneNumber || !data.message) {
          throw new Error('Missing data for SMS QR code');
        }
        qrCodeData = `sms:${data.countryCode}${data.phoneNumber}&body=${encodeURIComponent(data.message)}`;
        break;
      case 'Whatsapp':
        if (!data.countryCode || !data.phoneNumber || !data.message) {
          throw new Error('Missing data for WhatsApp QR code');
        }
        const encodedMessage = encodeURIComponent(data.message);
        qrCodeData = `https://wa.me/${data.countryCode}${data.phoneNumber}?text=${encodedMessage}`;
        break;
      case 'Wifi':
        qrCodeData = `WIFI:S:${data.ssid};T:${data.networkType};P:${data.password};H:${data.hidden ? 'true' : 'false'};`;
        break;
      case 'Event':
        qrCodeData = `BEGIN:VEVENT\nSUMMARY:${data.eventName}\nDTSTART:${data.startDate.replace(/-|:/g, '')}\nDTEND:${data.endDate.replace(/-|:/g, '')}\nLOCATION:${data.location}\nDESCRIPTION:${data.description}\nEND:VEVENT`;
        break;
      case 'VCard':
        qrCodeData = `BEGIN:VCARD
VERSION:3.0
FN:${data.firstName} ${data.lastName}
TEL:${data.phoneNumber}
CELL:${data.mobile}
EMAIL:${data.email}
ORG:${data.company}
TITLE:${data.jobTitle}
FAX:${data.fax}
ADR:${data.address};${data.city};${data.postCode};${data.country}
URL:${data.website}
END:VCARD`;
        break;
      case 'Social Media':
        qrCodeData = `Social Media Profiles:\nFacebook: ${data.facebookUrl}\nTwitter: ${data.twitterUrl}`;
        break;
      case 'App':
        qrCodeData = `App Download links:\nApp Store : ${data.appStoreLink}\nPlay Store : ${data.playStoreLink}`;
        break;
        case 'Video':
          qrCodeData = data.videoUrl;
        break;
        case 'Facebook':
          qrCodeData = data.profileUrl;
        break;
        case 'Twitter':
          qrCodeData = data.profileUrl;
        break;
        case 'Location':
          qrCodeData = `geo:${data.latitude},${data.longitude}`; 
          break;

      default:
        throw new Error('Unsupported QR code type');
    }

    return qrCodeData;
  }
}
