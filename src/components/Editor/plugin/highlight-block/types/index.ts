import { HIGHLIGHT_BLOCK_KEY } from "..";

declare module "slate" {
  export interface BaseElement {
    [HIGHLIGHT_BLOCK_KEY]?: Record<string, any>;
  }
}
