export const validateName = (name: string) => name.trim().length >= 2;

export const validatePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 14;
};

export const validateEmail = (email: string) => {
  const pattern = /^[\w.!#$%&'*+/=?^_`{|}~-]+@[\w-]+(\.[\w-]+)+$/;
  return pattern.test(email.trim());
};
