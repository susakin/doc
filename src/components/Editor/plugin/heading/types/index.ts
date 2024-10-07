import { Heading, HEADING_KEY } from "..";

declare module "slate" {
  export interface BaseElement {
    [HEADING_KEY]?: Heading;
  }
}
