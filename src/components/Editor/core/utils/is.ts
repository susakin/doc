const opt = Object.prototype.toString;
export const isUndefined = (value: unknown) => {
  return typeof value === "undefined";
};
export const isNull = (value: unknown) => {
  return value === null;
};
export const isEmptyValue = (value: unknown) => {
  return value === null || value === void 0;
};
export const isNil = isEmptyValue;
export const isObject = (value: unknown) => {
  return opt.call(value) === "[object Object]";
};
export const isArray = (value: unknown) => {
  return Array.isArray(value);
};
export const isNumber = (value: unknown) => {
  return opt.call(value) === "[object Number]";
};
export const isPlainNumber = (value: unknown) => {
  return /^(-|\+)?\d+(\.\d+)?$/.test(String(value));
};
export const isString = (value: unknown) => {
  return opt.call(value) === "[object String]";
};
export const isFunction = (value: unknown) => {
  return typeof value === "function";
};
export const isPlainObject = (value: object) => {
  if (!isObject(value)) {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  return value.constructor === Object;
};
export const isBoolean = (value: unknown) => {
  return (
    value === true || value === false || opt.call(value) === "[object Boolean]"
  );
};
