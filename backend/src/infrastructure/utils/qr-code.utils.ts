import { QR_CODE_TYPES } from '../../shared/constants/qr-code.constants';

/**
 * Generates the data string for a QR code based on the specified type and data.
 * @param {string} type - The type of QR code to generate (e.g., LINK, EMAIL, TEXT).
 * @param {any} data - The data object containing information relevant to the QR code type.
 * @returns {string} - The data string formatted for the specified QR code type.
 * @throws {Error} - Throws an error if the QR code type is unsupported or if required data is missing.
 */
export const getQRCodeData = (type: string, data: any): string => {
  let qrCodeData: string;

  switch (type) {
    case QR_CODE_TYPES.LINK:
      qrCodeData = data.url;
      break;
    case QR_CODE_TYPES.EMAIL:
      qrCodeData = `mailto:${data.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.message)}`;
      break;
    case QR_CODE_TYPES.TEXT:
      qrCodeData = data.text;
      break;
    case QR_CODE_TYPES.CALL:
      qrCodeData = `tel:${data.countryCode}${data.phoneNumber}`;
      break;
    case QR_CODE_TYPES.SMS:
      if (!data.countryCode || !data.phoneNumber || !data.message) {
        throw new Error('Missing data for SMS QR code');
      }
      qrCodeData = `sms:${data.countryCode}${data.phoneNumber}&body=${encodeURIComponent(data.message)}`;
      break;
    case QR_CODE_TYPES.WHATSAPP:
      if (!data.countryCode || !data.phoneNumber || !data.message) {
        throw new Error('Missing data for WhatsApp QR code');
      }
      const encodedMessage = encodeURIComponent(data.message);
      qrCodeData = `https://wa.me/${data.countryCode}${data.phoneNumber}?text=${encodedMessage}`;
      break;
    case QR_CODE_TYPES.WIFI:
      qrCodeData = `WIFI:S:${data.ssid};T:${data.networkType};P:${data.password};H:${data.hidden ? 'true' : 'false'};`;
      break;
    case QR_CODE_TYPES.EVENT:
      qrCodeData = `BEGIN:VEVENT\nSUMMARY:${data.eventName}\nDTSTART:${data.startDate.replace(/-|:/g, '')}\nDTEND:${data.endDate.replace(/-|:/g, '')}\nLOCATION:${data.location}\nDESCRIPTION:${data.description}\nEND:VEVENT`;
      break;
    case QR_CODE_TYPES.VCARD:
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
    case QR_CODE_TYPES.SOCIAL_MEDIA:
      qrCodeData = `Social Media Profiles:\nFacebook : ${data.facebookUrl}\nTwitter : ${data.twitterUrl}\nInstagram : ${data.instagramUrl}`;
      break;
    case QR_CODE_TYPES.APP:
      qrCodeData = `App Download links:\nApp Store : ${data.appStoreLink}\nPlay Store : ${data.playStoreLink}`;
      break;
    case QR_CODE_TYPES.VIDEO:
      qrCodeData = data.videoUrl;
      break;
    case QR_CODE_TYPES.FACEBOOK:
      qrCodeData = data.profileUrl;
      break;
    case QR_CODE_TYPES.TWITTER:
      qrCodeData = data.profileUrl;
      break;
    case QR_CODE_TYPES.LOCATION:
      qrCodeData = `geo:${data.latitude},${data.longitude}`;
      break;
    default:
      throw new Error('Unsupported QR code type');
  }

  return qrCodeData;
};
