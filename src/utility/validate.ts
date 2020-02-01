import * as validator from 'validator';
import * as WAValidator from 'wallet-address-validator';

export const validate = {
  email(email) {
    return validator.isEmail(email);
  },
  valid_string(str, min, max = 8192) {
    if (!str || typeof str !== "string") return false;
    const len = str.length;
    if (len < min) return false;
    if (len > max) return false;
    return true;
  },
  valid_number(number, min, max) {
    if (number < min) return false;
    if (number > max) return false;
    return true;
  },
  valid_username(str) {
    const regex = /^[a-zA-Z0-9\+]{4,18}$/;
    if (!regex.test(str)) return false;
    return true;
  },
  valid_password(str)
  {
    const regex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
    if(!regex.test(str)) return false;
    return true;
  }
}