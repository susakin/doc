import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Editor } from "slate";
import { getMarkByFormat, isMarkActive } from "../../utils";
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
      const fontLeaf = getMarkByFormat(this.editor as any, FONT_LEAF_KEY);
      const payload = {
        isActive: !!fontLeaf,
        fontLeaf,
      };
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, payload);
    });
  }

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[FONT_LEAF_KEY];
  }

  public destroy?: (() => void) | undefined;

  public getCurrentStatus = () => {
    const fontLeaf = getMarkByFormat(this.editor as any, this.key);
    return {
      isActive: !!fontLeaf,
      fontLeaf,
    };
  };

  public onCommand: CommandFn = ({ fontLeaf }) => {
    if (this.editor) {
      const isActive = isMarkActive(this.editor, this.key);
      if (isActive) {
        Editor.removeMark(this.editor, this.key);
      } else {
        Editor.addMark(this.editor, this.key, fontLeaf);
      }
      setTimeout(() => {
        this.event.trigger(
          EDITOR_EVENT.SELECTION_CHANGE,
          this.editor?.selection as any
        );
      });
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
