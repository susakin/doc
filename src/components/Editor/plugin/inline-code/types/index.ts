import { INLINE_CODE_KEY } from "..";

declare module "slate" {
  export interface BaseText {
    [INLINE_CODE_KEY]?: boolean;
  }
}
