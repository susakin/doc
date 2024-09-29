import { Align, ALIGN_KEY } from "..";

declare module "slate" {
  export interface BaseElement {
    [ALIGN_KEY]?: Align;
  }
}
