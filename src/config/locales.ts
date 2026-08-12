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
    az: 'Bu əməliyyat üçün icazəniz yoxdur',
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
    az: 'Bu e-poçtla artıq qeydiyyatdan keçmiş istifadəçi var',
    en: 'A user with this email already exists',
    ru: 'Пользователь с таким email уже существует',
  },
  INVALID_CREDENTIALS: {
    az: 'E-poçt və ya şifrə yanlışdır',
    en: 'Invalid email or password',
    ru: 'Неверный email или пароль',
  },
  INVALID_REFRESH_TOKEN: {
    az: 'Refresh token etibarsızdır',
    en: 'Invalid refresh token',
    ru: 'Недействительный токен обновления',
  },
  REVIEW_NOT_ELIGIBLE: {
    az: 'Bu xidmətə rəy yaza bilməzsiniz',
    en: 'You are not eligible to review this service',
    ru: 'Вы не имеете права оставить отзыв об этой услуге',
  },
  REVIEW_NOT_OWNER: {
    az: 'Bu rəy sizə aid deyil',
    en: 'You do not own this review',
    ru: 'Этот отзыв вам не принадлежит',
  },
  ORDER_EXPIRED: {
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
  ORDER_CANCELLED: {
    az: 'Sifariş ləğv edilib',
    en: 'Order has been cancelled',
    ru: 'Бронирование отменено',
  },
  ORDER_CONFIRMED: {
    az: 'Sifariş artıq təsdiqlənib',
    en: 'Order is already confirmed',
    ru: 'Бронирование уже подтверждено',
  },
  CANNOT_CANCEL_CONFIRMED: {
    az: 'Təsdiqlənmiş sifarişi ləğv etmək olmaz',
    en: 'Cannot cancel a confirmed order',
    ru: 'Невозможно отменить подтвержденное бронирование',
  },
  ORDER_ALREADY_PAID: {
    az: 'Sifariş artıq ödənilib',
    en: 'Order is already paid',
    ru: 'Бронирование уже оплачено',
  },
  PRICE_NOT_COMPUTED: {
    az: 'Sifarişin qiyməti hələ hesablanmayıb',
    en: 'Order has not completed price calculation',
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
    az: 'Yanlış ID formatı',
    en: 'Invalid wishlist item ID format',
    ru: 'Неверный формат ID элемента списка желаний',
  },
  RATE_LIMIT: {
    az: 'Həddən çox sorğu göndərildi. Zəhmət olmasa, sonra yenidən cəhd edin',
    en: 'Too many requests. Please try again later',
    ru: 'Слишком много запросов. Попробуйте позже',
  },
  HAS_ACTIVE_BOOKINGS: {
    az: 'Bu xidmete aktiv sifarisler baglidir, siline bilmez',
    en: 'This item has active bookings and cannot be deleted',
    ru: 'U etogo obekta est aktivnye bronirovaniya, udalenie nevozmozhno',
  },
  PAYMENT_IN_PROGRESS: {
    az: 'Bu sifaris ucun odenis artiq icra olunur',
    en: 'Payment is already in progress for this order',
    ru: 'Platezh po etomu zakazu uzhe obrabatyvaetsya',
  },
  IMAGE_NOT_FOUND: {
    az: 'İstinad edilən şəkil tapılmadı, vaxtı bitib və ya sizə aid deyil',
    en: 'The referenced image could not be found, has expired, or does not belong to you',
    ru: 'Указанное изображение не найдено, срок его действия истек, или оно вам не принадлежит',
  },
  INVALID_FILE_TYPE: {
    az: 'Yalnız şəkil fayllarına (jpeg, png, webp, gif) icazə verilir',
    en: 'Only image files (jpeg, png, webp, gif) are allowed',
    ru: 'Разрешены только файлы изображений (jpeg, png, webp, gif)',
  },
  INVALID_FILE: {
    az: 'Yüklənmiş fayl etibarsızdır',
    en: 'The uploaded file is invalid',
    ru: 'Загруженный файл недействителен',
  },
  price_suffix_per_night: {
    az: '/ gecə',
    en: '/ night',
    ru: '/ ночь',
  },
  price_suffix_per_day: {
    az: '/ gün',
    en: '/ day',
    ru: '/ день',
  },
  price_suffix_per_item: {
    az: '',
    en: '',
    ru: '',
  },
  price_suffix_per_person: {
    az: 'adam başı',
    en: '/ person',
    ru: 'за человека',
  },
};

/**
 * Get a localized system message by error/message code.
 */
export function t(code: string, lang: SupportedLang = 'en'): string {
  const entry = messages[code];
  if (!entry) return messages.INTERNAL_ERROR[lang] || messages.INTERNAL_ERROR.en;
  return entry[lang] || entry.en || messages.INTERNAL_ERROR.en;
}

export default messages;


