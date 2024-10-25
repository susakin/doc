import { RenderLeafProps } from "slate-react";
import { LeafContext, SampleLeafPlugin } from "../base";

export const ITALIC_KEY = "italic";

const hotkey = "ctrl+i";
export class ItalicPlugin extends SampleLeafPlugin {
  public readonly key: string = ITALIC_KEY;
  public readonly hotkey: string = hotkey;

  constructor() {
    super();
  }

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[ITALIC_KEY];
  }

  public destroy?: (() => void) | undefined;

  public render(context: LeafContext): JSX.Element {
    const { children } = context;
    return <i style={{ fontStyle: "italic" }}>{children}</i>;
  }
}

export const italicPlugin = new ItalicPlugin();
