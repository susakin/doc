import { HEADER_TITLE_KEY } from "..";

declare module "slate" {
  export interface BaseElement {
    [HEADER_TITLE_KEY]?: boolean;
  }
}
