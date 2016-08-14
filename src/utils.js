/* eslint-disable import/prefer-default-export */

export const capitalize = (str) => {
  if (typeof str !== 'string') {
    return null;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const chr4 = () => {
  return Math.random().toString(16).slice(-4);
};

export const uniqueId = () => {
  return [chr4(), chr4(), chr4(), chr4(), chr4(), chr4(), chr4(), chr4()].join('');
};
