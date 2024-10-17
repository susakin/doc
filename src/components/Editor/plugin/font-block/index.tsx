import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockPlugin, CommandFn, BlockContext } from "../base";
import { Transforms } from "slate";
import { EDITOR_EVENT } from "../../event/action";
import styles from "./index.module.less";

export const FONT_BLOCK_KEY = "font-block";

export class FontBlockPlugin extends BlockPlugin {
  public readonly key: string = FONT_BLOCK_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, (element) => {
      const fontBlock = (element as any)?.[this.key];
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
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
      const at = ReactEditor.findPath(
        this.editor as any,
        this.selectedElement as any
      );
      Transforms.setNodes(
        this.editor,
        {
          [this.key]: fontBlock,
        },
        { at }
      );
    }
    this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
      fontBlock,
    });
  };

  public getCurrentStatus = () => {
    const fontBlock = (this.selectedElement as any)?.[this.key];
    return {
      fontBlock,
    };
  };

  public render(context: BlockContext): JSX.Element {
    const { props } = context;
    const config = props.element[FONT_BLOCK_KEY];
    context.style = { ...context.style, color: config?.color };

    return (
      <>
        {context.children}
        <div
          className={styles[`background-mask`]}
          style={{ backgroundColor: config?.backgroundColor }}
        />
      </>
    );
  }
}

export const fontBlockPlugin = new FontBlockPlugin();
