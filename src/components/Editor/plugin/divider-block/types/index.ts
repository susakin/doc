import { DIVIDER_BLOCK_KEY } from "..";

declare module "slate" {
  export interface BaseElement {
    [DIVIDER_BLOCK_KEY]?: boolean;
  }
}
