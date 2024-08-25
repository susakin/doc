import "./index.scss";

import type { CommandFn, EditorKit } from "../../core";
import type { BlockContext, BlockProps } from "../../core";
import { BlockPlugin } from "../../core";

import { ALIGN_KEY } from "./types";
import { isObject } from "../../core/utils/is";
import { isMatchedAttributeNode } from "../../core/utils/editorHelper";
import { setBlockNode } from "../../core/utils/set";

export class AlignPlugin extends BlockPlugin {
  public readonly key: string = ALIGN_KEY;

  constructor(private editor: EditorKit) {
    super();
  }

  public destroy(): void {}

  public onCommand: CommandFn = (data) => {
    if (
      isObject(data) &&
      !isMatchedAttributeNode(this.editor.raw, ALIGN_KEY, data.extraKey)
    ) {
      setBlockNode(this.editor.raw, { [this.key]: data.extraKey });
    }
  };

  public match(props: BlockProps): boolean {
    return !!props.element[ALIGN_KEY];
  }

  public renderLine(context: BlockContext): JSX.Element {
    const align = context.props.element[ALIGN_KEY];
    if (!align || align === "left") return context.children;
    context.classList.push("align-" + align);
    return context.children;
  }
}
