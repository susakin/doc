import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Editor } from "slate";
import { isMarkActive } from "../../utils";
import { EDITOR_EVENT } from "../../event/action";

export const FONT_BASE_KEY = "font-base";

export class FontBasePlugin extends LeafPlugin {
  public readonly key: string = FONT_BASE_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.EDITOR_CHANGE, (editor) => {
      const isActive = isMarkActive(editor, FONT_BASE_KEY);
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive,
      });
    });
  }

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[FONT_BASE_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onCommand: CommandFn = ({ fontBase }) => {
    if (this.editor) {
      const isActive = isMarkActive(this.editor, fontBase);
      if (isActive) {
        Editor.removeMark(this.editor, fontBase);
      } else {
        Editor.addMark(this.editor, fontBase, true);
      }
    }
  };

  public render(context: LeafContext): JSX.Element {
    const { props } = context;
    const config = props.leaf[FONT_BASE_KEY];
    context.style = { ...context.style, ...(config || {}) };
    return context.children;
  }
}

export const fontBasePlugin = new FontBasePlugin();
