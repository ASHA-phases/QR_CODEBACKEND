/**
 * Constants defining various types of QR codes supported in the application.
 * These types are used to specify the purpose or category of each QR code.
 */
export const QR_CODE_TYPES = {
  LINK: 'Link',                   // QR code containing a URL link
  EMAIL: 'Email',                 // QR code for sending an email
  TEXT: 'Text',                   // QR code containing plain text
  CALL: 'Call',                   // QR code for making a phone call
  SMS: 'Sms',                     // QR code for sending an SMS
  WHATSAPP: 'Whatsapp',           // QR code for sending a WhatsApp message
  WIFI: 'Wifi',                   // QR code for WiFi network configuration
  EVENT: 'Event',                 // QR code for event details (e.g., calendar event)
  VCARD: 'VCard',                 // QR code containing contact information (vCard format)
  SOCIAL_MEDIA: 'Social Media',   // QR code for social media profiles
  APP: 'App',                     // QR code for app download links
  VIDEO: 'Video',                 // QR code for video content or links
  FACEBOOK: 'Facebook',           // QR code for Facebook profile or content
  TWITTER: 'Twitter',             // QR code for Twitter profile or content
  LOCATION: 'Location',           // QR code for geographical location coordinates
};
