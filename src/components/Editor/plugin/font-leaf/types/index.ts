import { FONT_LEAF_KEY } from "..";

declare module "slate" {
  export interface BaseText {
    [FONT_LEAF_KEY]?: Record<string, any>;
  }
}
