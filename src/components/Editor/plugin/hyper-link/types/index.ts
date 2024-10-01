import { HYPER_LINK_KEY, HyperLinkConfig } from "..";

declare module "slate" {
  export interface BaseText {
    [HYPER_LINK_KEY]?: HyperLinkConfig;
  }
}
