/**
 * Interface defining the methods for interacting with QR codes in different formats.
 * 
 * The `IQrCodeRepository` interface declares methods for generating QR codes
 * in base64, PNG, SVG, and PDF formats.
 */
export interface IQrCodeRepository {
  /**
   * Generates a QR code in base64 format.
   * 
   * @param {string} type - The type of QR code to generate.
   * @param {any} data - The data to encode in the QR code.
   * @returns {Promise<string>} - A promise that resolves to the base64 encoded QR code.
   */
  generateQRCode(type: string, data: any): Promise<string>;

  /**
   * Generates a QR code in PNG format.
   * 
   * @param {string} type - The type of QR code to generate.
   * @param {any} data - The data to encode in the QR code.
   * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the PNG file.
   */
  generateQRCodePNG(type: string, data: any): Promise<Buffer>;

  /**
   * Generates a QR code in SVG format.
   * 
   * @param {string} type - The type of QR code to generate.
   * @param {any} data - The data to encode in the QR code.
   * @returns {Promise<string>} - A promise that resolves to a string containing the SVG file.
   */
  generateQRCodeSVG(type: string, data: any): Promise<string>;

  /**
   * Generates a QR code in PDF format.
   * 
   * @param {string} type - The type of QR code to generate.
   * @param {any} data - The data to encode in the QR code.
   * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the PDF file.
   */
  generateQRCodePDF(type: string, data: any): Promise<Buffer>;
}

/**
 * Data Transfer Object (DTO) for creating a QR code.
 * 
 * The `QRCodeDTO` interface defines the structure of data required
 * to generate a QR code, including its type and data to encode.
 */
export interface QRCodeDTO {
  type: string;
  data: any;
}
