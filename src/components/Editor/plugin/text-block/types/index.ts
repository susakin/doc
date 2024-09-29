import { TEXT_BLOCK_KEY } from "..";

declare module "slate" {
  export interface BaseElement {
    [TEXT_BLOCK_KEY]?: boolean;
  }
}
