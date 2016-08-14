/* eslint-disable import/prefer-default-export */

export const capitalize = (str) => {
  if (typeof str !== 'string') {
    return null;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
