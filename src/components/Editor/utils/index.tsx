import { Placement, Side } from "@floating-ui/react";

export function getSideAnimateClassName(placement: Placement): string {
  const [side] = placement?.split("-") as [Side];
  const position = {
    left: "slide-right-in",
    right: "slide-left-in",
    top: "slide-bottom-in",
    bottom: "slide-up-in",
    display: "inline-flex",
  };
  return position[side];
}

export const svgProps = { width: "1em", height: "1em", viewBox: "0 0 24 24" };

export const isObject = (value: unknown): value is Record<any, any> =>
  value !== null && typeof value === "object";
export const isFunction = (value: unknown): value is (...args: any) => any =>
  typeof value === "function";

export const isString = (value: unknown): value is string =>
  typeof value === "string";
export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";
export const isNumber = (value: unknown): value is number =>
  typeof value === "number";
export const isUndef = (value: unknown): value is undefined =>
  typeof value === "undefined";
