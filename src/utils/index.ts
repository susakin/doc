import { Placement, Side } from "@floating-ui/react";

export function getSideAnimateClassName(placement: Placement): string {
  const [side] = placement?.split("-") as [Side];
  const position = {
    left: "slide-right-in",
    right: "slide-left-in",
    top: "slide-bottom-in",
    bottom: "slide-up-in",
  };
  return position[side];
}
