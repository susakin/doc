import { RenderElementProps } from "slate-react";
import { BlockPlugin, CommandFn, BlockContext } from "../base";
import { Location, Transforms } from "slate";
import { getAttributeAtCursor, isBlockActive } from "../../utils";
import { EDITOR_EVENT } from "../../event/action";
import { HEADING_KEY, headingPlugin } from "../heading";

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
      const heading = getAttributeAtCursor(this.editor, HEADING_KEY);

      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive: !!textBlock || !heading,
        textBlock,
      });
    });
  }

  public getCurrentStatus = () => {
    const textBlock = getAttributeAtCursor(this.editor, TEXT_BLOCK_KEY);
    const heading = getAttributeAtCursor(this.editor, HEADING_KEY);
    return {
      isActive: !!textBlock || !heading,
      textBlock,
    };
  };

  public match(props: RenderElementProps): boolean {
    return !!props.element[TEXT_BLOCK_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onCommand: CommandFn = ({ at }) => {
    if (this.editor) {
      const isActive = isBlockActive(this.editor, TEXT_BLOCK_KEY, true);
      Transforms.setNodes(
        this.editor,
        Object.assign(
          {
            [this.key]: isActive ? undefined : true,
          },
          !isActive ? { [HEADING_KEY]: undefined } : {}
        ),
        {
          at,
        }
      );
      setTimeout(() => {
        this.event.trigger(
          EDITOR_EVENT.SELECTION_CHANGE,
          this.editor?.selection as any
        );
        headingPlugin.event.trigger(
          EDITOR_EVENT.SELECTION_CHANGE,
          this.editor?.selection as any
        );
      });
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    return context.children;
  }
}

export const textBlockPlugin = new TextBlockPlugin();
