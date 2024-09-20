import { RenderElementProps } from "slate-react";
import { BlockPlugin, CommandFn, BlockContext } from "../base";
import { Transforms } from "slate";
import { getAttributeAtCursor } from "../../utils";
import { EDITOR_EVENT } from "../../event/action";

export const FONT_BLOCK_KEY = "font-block";

export class FontBlockPlugin extends BlockPlugin {
  public readonly key: string = FONT_BLOCK_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const fontBlock = getAttributeAtCursor(this.editor, FONT_BLOCK_KEY);

      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive: !!fontBlock,
        fontBlock,
      });
    });
  }

  public match(props: RenderElementProps): boolean {
    return !!props.element[FONT_BLOCK_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onCommand: CommandFn = ({ fontBlock }) => {
    if (this.editor) {
      Transforms.setNodes(this.editor, {
        fontBlock,
      });
    }
  };

  public render(context: BlockContext): JSX.Element {
    const { props } = context;
    const config = props.element[FONT_BLOCK_KEY];
    context.style = { ...context.style, ...(config || {}) };
    return context.children;
  }
}

export const fontBlockPlugin = new FontBlockPlugin();
