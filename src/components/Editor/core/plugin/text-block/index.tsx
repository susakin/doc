import { RenderElementProps } from "slate-react";
import { BlockPlugin, CommandFn, BlockContext } from "../base";
import { Transforms } from "slate";
import { getAttributeAtCursor, isBlockActive } from "../../utils";
import { EDITOR_EVENT } from "../../event/action";

export const TEXT_BLOCK_KEY = "text-block";

export class TextBlockPlugin extends BlockPlugin {
  public readonly key: string = TEXT_BLOCK_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const textBlock = getAttributeAtCursor(this.editor, TEXT_BLOCK_KEY);

      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive: !!textBlock,
        textBlock,
      });
    });
  }

  public match(props: RenderElementProps): boolean {
    return !!props.element[TEXT_BLOCK_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onCommand: CommandFn = () => {
    if (this.editor) {
      const isActive = isBlockActive(this.editor, TEXT_BLOCK_KEY, true);
      Transforms.setNodes(this.editor, {
        "text-block": isActive ? undefined : true,
      });
    }
  };

  public render(context: BlockContext): JSX.Element {
    return context.children;
  }
}

export const textBlockPlugin = new TextBlockPlugin();
