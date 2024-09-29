import { LINETHROUGH_KEY } from "..";

declare module "slate" {
  export interface BaseText {
    [LINETHROUGH_KEY]?: boolean;
  }
}
