const opt = Object.prototype.toString;

export const isObject = (value: unknown) => {
  return opt.call(value) === "[object Object]";
};
