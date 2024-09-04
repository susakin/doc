declare module "../../../core/delta/interface" {
  interface BlockElement {
    [ALIGN_KEY]?: "left" | "center" | "right";
  }
}

export const ALIGN_KEY = "align";
