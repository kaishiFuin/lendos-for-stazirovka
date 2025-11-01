export const validateName = (value: string): string | null => {
  if (!value || value.trim().length < 2) {
    return 'Введите имя полностью';
  }
  if (!/^[\p{L}'\-\s]+$/u.test(value.trim())) {
    return 'Имя может содержать только буквы';
  }
  return null;
};

export const validatePhone = (value: string): string | null => {
  if (!value) return 'Укажите номер телефона';
  const digits = value.replace(/\D/g, '');
  if (digits.length < 10) {
    return 'Номер должен содержать минимум 10 цифр';
  }
  return null;
};

export const validateEmail = (value: string): string | null => {
  if (!value) return 'Укажите e-mail';
  const pattern = /^(?:[a-z0-9_\.-]+)@(?:[a-z0-9-]+\.)+[a-z]{2,}$/i;
  if (!pattern.test(value.trim())) {
    return 'Проверьте e-mail';
  }
  return null;
};
