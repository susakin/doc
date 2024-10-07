import { QUOTE_KEY } from "..";

declare module "slate" {
  export interface BaseElement {
    [QUOTE_KEY]?: boolean;
  }
}
