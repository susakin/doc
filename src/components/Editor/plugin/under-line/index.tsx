import { RenderLeafProps } from "slate-react";
import { LeafContext, SampleLeafPlugin } from "../base";

export const UNDERLINE_KEY = "under-line";

const hotkey = "ctrl+u";

export class UnderLinePlugin extends SampleLeafPlugin {
  public readonly key: string = UNDERLINE_KEY;
  public readonly hotkey: string = hotkey;

  constructor() {
    super();
  }

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[UNDERLINE_KEY];
  }

  public destroy?: (() => void) | undefined;

  public render(context: LeafContext): JSX.Element {
    const { children } = context;
    const style = {
      "text-decoration-skip-ink": "none",
      "text-underline-offset": "0.2em",
      "text-decoration": "underline",
    };
    return <u style={style as React.CSSProperties}>{children}</u>;
  }
}

export const underLinePlugin = new UnderLinePlugin();
