import { HYPER_LINK_KEY, HyperLink } from "..";

declare module "slate" {
  export interface BaseText {
    [HYPER_LINK_KEY]?: HyperLink;
  }
}
