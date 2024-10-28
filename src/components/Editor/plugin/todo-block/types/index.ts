import { TODO_BLCOK_KEY } from "..";

declare module "slate" {
  export interface BaseElement {
    [TODO_BLCOK_KEY]?: {
      done?: boolean;
    };
  }
}
