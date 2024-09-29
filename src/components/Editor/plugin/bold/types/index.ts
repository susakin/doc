import { BOLD_KEY } from "..";

declare module "slate" {
  export interface BaseText {
    [BOLD_KEY]?: boolean;
  }
}
