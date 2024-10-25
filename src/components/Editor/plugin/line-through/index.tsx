import { RenderLeafProps } from "slate-react";
import { LeafContext, SampleLeafPlugin } from "../base";

export const LINETHROUGH_KEY = "line-through";

const hotkey = "ctrl+shift+x";

export class LineThroughPlugin extends SampleLeafPlugin {
  public readonly key: string = LINETHROUGH_KEY;
  public readonly hotkey: string = hotkey;
  constructor() {
    super();
  }

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[LINETHROUGH_KEY];
  }

  public destroy?: (() => void) | undefined;

  public render(context: LeafContext): JSX.Element {
    const { children } = context;
    return (
      <del
        style={{
          ["text-decoration-skip-ink" as any]: "none",
          ["text-underline-offset" as any]: "0.2em",
          ["text-decoration" as any]: "line-through",
        }}
      >
        {children}
      </del>
    );
  }
}

export const lineThroughPlugin = new LineThroughPlugin();
