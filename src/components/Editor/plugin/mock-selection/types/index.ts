import { MOCK_SELECTION_KEY } from "..";

declare module "slate" {
  export interface BaseText {
    [MOCK_SELECTION_KEY]?: boolean;
  }
}
