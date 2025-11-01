export function validateName(value: string): string | null {
  if (!value.trim()) return 'Введите имя';
  if (value.trim().length < 2) return 'Имя слишком короткое';
  return null;
}

export function validatePhone(value: string): string | null {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 10) return 'Введите номер телефона полностью';
  return null;
}

export function validateEmail(value: string): string | null {
  if (!value.trim()) return 'Введите email';
  const pattern = /^[\w.!#$%&'*+/=?`{|}~-]+@[\w-]+(\.[\w-]+)+$/i;
  return pattern.test(value.trim()) ? null : 'Email указан неверно';
}
