import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Editor } from "slate";
import { getAttributeAtCursor, isMarkActive } from "../../utils";
import { EDITOR_EVENT } from "../../event/action";

export const FONT_LEAF_KEY = "font-leaf";

export class FontLeafPlugin extends LeafPlugin {
  public readonly key: string = FONT_LEAF_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const fontLeaf = getAttributeAtCursor(this.editor, FONT_LEAF_KEY);
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive: !!fontLeaf,
        fontLeaf,
      });
    });
  }

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[FONT_LEAF_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onCommand: CommandFn = ({ fontLeaf }) => {
    if (this.editor) {
      const isActive = isMarkActive(this.editor, fontLeaf);
      if (isActive) {
        Editor.removeMark(this.editor, fontLeaf);
      } else {
        Editor.addMark(this.editor, fontLeaf, true);
      }
    }
  };

  public render(context: LeafContext): JSX.Element {
    const { props } = context;
    const config = props.leaf[FONT_LEAF_KEY];
    context.style = { ...context.style, ...(config || {}) };
    return context.children;
  }
}

export const fontLeafPlugin = new FontLeafPlugin();
