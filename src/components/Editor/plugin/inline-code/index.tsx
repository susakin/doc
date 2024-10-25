import { RenderLeafProps } from "slate-react";
import { LeafContext, SampleLeafPlugin } from "../base";

import styles from "./index.module.less";

const classNamePrefix = "inline-code";

export const INLINE_CODE_KEY = "inline-code";

const hotkey = "ctrl+shift+c";

export class InlineCodePlugin extends SampleLeafPlugin {
  public readonly key: string = INLINE_CODE_KEY;
  public readonly hotkey: string = hotkey;
  constructor() {
    super();
  }

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[INLINE_CODE_KEY];
  }

  public destroy?: (() => void) | undefined;

  public render(context: LeafContext): JSX.Element {
    const { children } = context;
    return <span className={styles[`${classNamePrefix}`]}>{children}</span>;
  }
}

export const inlineCodePlugin = new InlineCodePlugin();
