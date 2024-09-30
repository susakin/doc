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
