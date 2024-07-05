import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrCodeService {
  async generateQRCode(type: string, data: any): Promise<string> {
    try {
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
          if (!data.countryCode || !data.phoneNumber || !data.text) {
            throw new Error('Missing data for SMS QR code');
          }
          qrCodeData = `sms:${data.countryCode}${data.phoneNumber}&body=${encodeURIComponent(data.message)}`;
          break;
        case 'Whatsapp':
          if (!data.countryCode || !data.phoneNumber || !data.text) {
            throw new Error('Missing data for WhatsApp QR code');
          }
          qrCodeData = `https://wa.me/${data.countryCode}${data.phoneNumber}&text=${encodeURIComponent(data.message)}`;
          break;
        case 'Wifi':
          qrCodeData = `WIFI:S:${data.ssid};T:${data.networkType};P:${data.password};H:${data.hidden ? 'true' : 'false'};`;
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
        default:
          throw new Error('Unsupported QR code type');
      }

      return await QRCode.toDataURL(qrCodeData);
    } catch (error) {
      console.error('Error generating QR code', error);
      throw new Error('Error generating QR code');
    }
  }
}
