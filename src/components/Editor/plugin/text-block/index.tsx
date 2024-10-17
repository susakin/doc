import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockPlugin, CommandFn, BlockContext } from "../base";
import { Transforms } from "slate";
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
    this.event.on(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, (element) => {
      const textBlock = (element as any)?.[this.key];
      const heading = (element as any)?.[HEADING_KEY];

      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: !!textBlock || !heading,
        textBlock,
      });
    });
  }

  public getCurrentStatus = () => {
    const textBlock = (this.selectedElement as any)?.[this.key];
    const heading = (this.selectedElement as any)?.[HEADING_KEY];
    return {
      isActive: !!textBlock || !heading,
      textBlock,
    };
  };

  public match(props: RenderElementProps): boolean {
    return !!props.element[TEXT_BLOCK_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onCommand: CommandFn = () => {
    if (this.editor) {
      const isActive = (this.selectedElement as any)?.[this.key] === true;
      const at = ReactEditor.findPath(
        this.editor as any,
        this.selectedElement as any
      );

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
      this.event.trigger(
        EDITOR_EVENT.SELECTION_CHANGE,
        this.editor?.selection as any
      );
      headingPlugin.event.trigger(
        EDITOR_EVENT.SELECTION_CHANGE,
        this.editor?.selection as any
      );
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    return context.children;
  }
}

export const textBlockPlugin = new TextBlockPlugin();
