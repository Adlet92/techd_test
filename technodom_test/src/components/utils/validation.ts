import { checkEmailExists, checkPhoneNumberExists } from "./verification";

export const isValidEmailFormat = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validateEmail = async (email: string): Promise<string[]> => {
  const errors: string[] = [];
  if (!email.trim()) {
    errors.push("Email обязателен");
  } else if (!isValidEmailFormat(email)) {
    errors.push("Email введён неверно");
  }
  else {
    const emailExists = await checkEmailExists(email);

    if (emailExists) {
      errors.push("Email уже существует");
    }
  }
  return errors;
};
export const validateName = (name: string): string[] => {
  const errors: string[] = [];
  if (!name.trim()) {
    errors.push("Имя не заполнено");
  }
  return errors;
};

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/[^\d]/g, '');
};
export const phoneNumberLength = (phoneNumber: string) => {
  return (formatPhoneNumber(phoneNumber).length === 11);
};
// export const validatePhoneNumber = (phoneNumber: string): string[] => {
//   const strippedPhoneNumber = formatPhoneNumber(phoneNumber);
//   const errors: string[] = [];
//   if (!phoneNumber.trim()) {
//     errors.push("Номер телефона обязателен");
//   } else if (!phoneNumberLength(strippedPhoneNumber)) {
//     errors.push("Номера телефона введён не полностью");
//   }else if (checkPhoneNumberExists(strippedPhoneNumber)) {
//     errors.push("Номер телефона уже существует");
//   }
//   return errors;
// };
export const validatePhoneNumber = async (phoneNumber: string): Promise<string[]> => {
  const strippedPhoneNumber = formatPhoneNumber(phoneNumber);
  const errors: string[] = [];

  if (!phoneNumber.trim()) {
    errors.push("Номер телефона обязателен");
  } else if (!phoneNumberLength(strippedPhoneNumber)) {
    errors.push("Номер телефона введён не полностью");
  } else {
    const phoneNumberExists = await checkPhoneNumberExists(strippedPhoneNumber);

    if (phoneNumberExists) {
      errors.push("Номер телефона уже существует");
    }
  }

  return errors;
};


export const validateForm = async (email: string, phoneNumber: string, name: string): Promise<string[]> => {
  const phoneNumberErrors = await validatePhoneNumber(phoneNumber);
  const nameErrors = validateName(name);
  const emailErrors = await validateEmail(email);
  return [...phoneNumberErrors, ...nameErrors, ...emailErrors];
};


