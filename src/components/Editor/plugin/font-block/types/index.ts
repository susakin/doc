import { FONT_BLOCK_KEY } from "..";

declare module "slate" {
  export interface BaseElement {
    [FONT_BLOCK_KEY]?: Record<string, any>;
  }
}
