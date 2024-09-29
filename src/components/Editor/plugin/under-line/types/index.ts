import { UNDERLINE_KEY } from "..";

declare module "slate" {
  export interface BaseText {
    [UNDERLINE_KEY]?: boolean;
  }
}
