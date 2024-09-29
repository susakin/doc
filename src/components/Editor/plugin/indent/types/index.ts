import { INDENT_KEY } from "..";

declare module "slate" {
  export interface BaseElement {
    [INDENT_KEY]?: boolean;
  }
}
