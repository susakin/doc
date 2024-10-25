import { RenderLeafProps } from "slate-react";
import { LeafContext, SampleLeafPlugin } from "../base";

export const BOLD_KEY = "bold";

const hotkey = "ctrl+b";

export class BoldPlugin extends SampleLeafPlugin {
  public readonly key: string = BOLD_KEY;
  public readonly hotkey: string = hotkey;
  constructor() {
    super();
  }

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[BOLD_KEY];
  }

  public destroy?: (() => void) | undefined;

  public render(context: LeafContext): JSX.Element {
    const { children } = context;
    return <strong style={{ fontWeight: "bold" }}>{children}</strong>;
  }
}

export const boldPlugin = new BoldPlugin();
