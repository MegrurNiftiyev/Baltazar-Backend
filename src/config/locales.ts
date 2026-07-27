export type SupportedLang = 'az' | 'en' | 'ru';

/**
 * Localized string map — every user-facing text field in Firestore
 * stores this shape (keys for each supported language).
 */
export interface LocalizedMap {
  az: string;
  en: string;
  ru: string;
}

/**
 * i18n dictionary for system/error messages.
 * Keyed by error code or message key, valued by a LocalizedMap.
 */
const messages: Record<string, LocalizedMap> = {
  AUTH_REQUIRED: {
    az: 'Giriş tələb olunur',
    en: 'Authentication required',
    ru: 'Требуется аутентификация',
  },
  TOKEN_EXPIRED: {
    az: 'Token müddəti bitib',
    en: 'Token has expired',
    ru: 'Срок действия токена истёк',
  },
  FORBIDDEN: {
    az: 'Bu əməliyyatı yerinə yetirmək icazəniz yoxdur',
    en: 'You do not have permission to perform this action',
    ru: 'У вас нет разрешения на выполнение этого действия',
  },
  VALIDATION_ERROR: {
    az: 'Daxil edilən məlumat yanlışdır',
    en: 'Invalid request data',
    ru: 'Неверные данные запроса',
  },
  NOT_FOUND: {
    az: 'Tapılmadı',
    en: 'Not found',
    ru: 'Не найдено',
  },
  USER_EXISTS: {
    az: 'Bu e-poçt ünvanı ilə istifadəçi artıq mövcuddur',
    en: 'A user with this email already exists',
    ru: 'Пользователь с таким email уже существует',
  },
  INVALID_CREDENTIALS: {
    az: 'E-poçt və ya şifrə yanlışdır',
    en: 'Invalid email or password',
    ru: 'Неверный email или пароль',
  },
  INVALID_REFRESH_TOKEN: {
    az: 'Yeniləmə tokeni etibarsızdır',
    en: 'Invalid refresh token',
    ru: 'Недействительный токен обновления',
  },
  REVIEW_NOT_ELIGIBLE: {
    az: 'Bu xidmətə rəy yazmaq hüququnuz yoxdur',
    en: 'You are not eligible to review this service',
    ru: 'Вы не имеете права оставить отзыв об этой услуге',
  },
  FLOWBOX_EXPIRED: {
    az: 'Sifariş müddəti bitib',
    en: 'This booking has expired',
    ru: 'Срок бронирования истёк',
  },
  PAYMENT_FAILED: {
    az: 'Ödəniş uğursuz oldu',
    en: 'Payment failed',
    ru: 'Платёж не удался',
  },
  INTERNAL_ERROR: {
    az: 'Daxili server xətası',
    en: 'Internal server error',
    ru: 'Внутренняя ошибка сервера',
  },
  USER_ALREADY_ADMIN: {
    az: 'İstifadəçi artıq admindir',
    en: 'User is already an admin',
    ru: 'Пользователь уже является администратором',
  },
  FLOWBOX_CANCELLED: {
    az: 'Sifariş ləğv edilib',
    en: 'FlowBox has been cancelled',
    ru: 'Бронирование отменено',
  },
  FLOWBOX_CONFIRMED: {
    az: 'Sifariş artıq təsdiqlənib',
    en: 'FlowBox is already confirmed',
    ru: 'Бронирование уже подтверждено',
  },
  CANNOT_CANCEL_CONFIRMED: {
    az: 'Təsdiqlənmiş sifarişi ləğv etmək olmaz',
    en: 'Cannot cancel a confirmed FlowBox',
    ru: 'Невозможно отменить подтвержденное бронирование',
  },
  FLOWBOX_ALREADY_PAID: {
    az: 'Sifariş artıq ödənilib',
    en: 'FlowBox is already paid',
    ru: 'Бронирование уже оплачено',
  },
  PRICE_NOT_COMPUTED: {
    az: 'Sifarişin qiyməti hesablanmayıb',
    en: 'FlowBox has not completed price calculation',
    ru: 'Расчет стоимости бронирования не завершен',
  },
  ALREADY_REVIEWED: {
    az: 'Bu xidmətə artıq rəy yazmısınız',
    en: 'You have already reviewed this service',
    ru: 'Вы уже оставили отзыв об этой услуге',
  },
  NO_FIELDS_TO_UPDATE: {
    az: 'Yeniləmək üçün məlumat yoxdur',
    en: 'No fields to update',
    ru: 'Нет полей для обновления',
  },
  ALREADY_IN_WISHLIST: {
    az: 'Artıq istək siyahısındadır',
    en: 'Already in wishlist',
    ru: 'Уже в списке желаний',
  },
  INVALID_WISHLIST_ID: {
    az: 'İstək siyahısı ID formatı yanlışdır',
    en: 'Invalid wishlist item ID format',
    ru: 'Неверный формат ID элемента списка желаний',
  },
};

/**
 * Get a localized system message by error/message code.
 */
export function t(code: string, lang: SupportedLang = 'en'): string {
  const entry = messages[code];
  if (!entry) return code;
  return entry[lang] || entry.en || code;
}

export default messages;
