export const isNotEmptyString = (str?: string): boolean => {
  return str && str.length > 0;
};

export const isNotEmptyFunction = (func?: Function): boolean => {
  return func && typeof func === 'function';
};
