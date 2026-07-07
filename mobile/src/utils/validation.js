export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateZipCode = (zipCode) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

export const validateURL = (url) => {
  const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  return urlRegex.test(url);
};

export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const fieldRules = rules[field];

    if (fieldRules.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`;
      return;
    }

    if (fieldRules.type === 'email' && value && !validateEmail(value)) {
      errors[field] = 'Invalid email address';
    }

    if (fieldRules.type === 'phone' && value && !validatePhone(value)) {
      errors[field] = 'Invalid phone number';
    }

    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      errors[field] = `Minimum length is ${fieldRules.minLength}`;
    }

    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      errors[field] = `Maximum length is ${fieldRules.maxLength}`;
    }
  });

  return errors;
};
