import { ITALIC_KEY } from "..";

declare module "slate" {
  export interface BaseText {
    [ITALIC_KEY]?: boolean;
  }
}
