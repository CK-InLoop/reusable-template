export const WHATSAPP_SETTING_KEY = 'contact.whatsapp';
export const DEFAULT_WHATSAPP_PHONE = '+971 56 433 2583';

export type WhatsAppContact = {
  phone: string;
  digits: string;
};

export function toWhatsAppContact(value: unknown): WhatsAppContact {
  let phone = DEFAULT_WHATSAPP_PHONE;
  if (value && typeof value === 'object' && 'phone' in value) {
    const storedPhone = (value as { phone?: unknown }).phone;
    if (typeof storedPhone === 'string') phone = storedPhone;
  } else if (typeof value === 'string') {
    phone = value;
  }

  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15
    ? { phone, digits }
    : { phone: DEFAULT_WHATSAPP_PHONE, digits: DEFAULT_WHATSAPP_PHONE.replace(/\D/g, '') };
}
