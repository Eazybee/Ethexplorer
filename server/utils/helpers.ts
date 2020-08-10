import Validator from 'validatorjs';
import * as types from './typings';

export const validate: types.validate = (data, rules) => {
  const validation = new Validator(data, rules);
  return validation.passes() || validation;
};

// eslint-disable-next-line arrow-body-style
export const asyncWrapper: types.asyncWrapper = (fn) => {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};

export const removeLeftPadding: types.removeLeftPadding = (paddedHex: string) => {
  if (paddedHex === '0x0000000000000000000000000000000000000000000000000000000000000000') {
    return '0x0000000000000000000000000000000000000000';
  }

  const val = paddedHex.split('0x')[1];

  const removeFirstZero: (val: string) => string = (newVal) => {
    if (newVal.charAt(0) === '0') {
      return removeFirstZero(newVal.substring(1));
    }
    return newVal;
  };
  return `0x${removeFirstZero(val)}`;
};
