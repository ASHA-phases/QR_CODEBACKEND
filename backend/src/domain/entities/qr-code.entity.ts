/**
 * Entity representing a QR code.
 * 
 * The `QrCode` class encapsulates the properties of a QR code, including its type and data.
 */
export class QrCode {
  /**
   * The constructor initializes a new instance of the `QrCode` class.
   * 
   * @param {string} type - The type of QR code.
   * @param {any} data - The data to encode in the QR code.
   */
  constructor(
    public readonly type: string,
    public readonly data: any,
  ) {}
}
