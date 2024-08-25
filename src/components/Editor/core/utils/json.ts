/**
 * Decode JSON String To Object
 * @param value string
 */
export const decodeJSON = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.log("Decode JSON Error:", error);
  }
  return null;
};
/**
 * Encode JSON Object To String
 * @param value Object
 */
export const encodeJSON = (value: object) => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.log("Encode JSON Error:", error);
  }
  return null;
};
export const TSON = {
  /**
   * Decode JSON String To Object
   * @param value string
   */
  decode: decodeJSON,
  /**
   * Encode JSON Object To String
   * @param value Object
   */
  encode: encodeJSON,
  /**
   * Decode JSON String To Object
   * @param value string
   */
  parse: decodeJSON,
  /**
   * Encode JSON Object To String
   * @param value Object
   */
  stringify: encodeJSON,
};
