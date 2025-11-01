export const isValidName = (value: string) => /[А-Яа-яA-Za-z\-\s]{2,}/.test(value.trim());

export const isValidPhone = (value: string) => {
  const sanitized = value.replace(/[^\d+]/g, '');
  return /^\+?\d{10,15}$/.test(sanitized);
};

export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
