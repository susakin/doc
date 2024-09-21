import { RenderElementProps } from "slate-react";
import { BlockPlugin, CommandFn } from "../base";
import { Transforms } from "slate";
import { getAttributeAtCursor } from "../../utils";
import { EDITOR_EVENT } from "../../event/action";
import Divider from "./Divider";

export const DIVIDER_BLOCK_KEY = "divider-block";

export class DividerBlockPlugin extends BlockPlugin {
  public readonly key: string = DIVIDER_BLOCK_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const dividerBlock = getAttributeAtCursor(this.editor, DIVIDER_BLOCK_KEY);
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive: !!dividerBlock,
        dividerBlock,
      });
    });
  }

  public match({ element }: RenderElementProps): boolean {
    return !!element[DIVIDER_BLOCK_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onCommand: CommandFn = () => {
    if (this.editor) {
      const key = this.key;
      const editor = this.editor;
      Transforms.insertNodes(editor, {
        [key]: true,
        children: [{ text: "" }],
      });
      Transforms.insertNodes(editor, {
        children: [{ text: "" }],
        "text-block": true,
      });
    }
  };

  public render(): JSX.Element {
    return <Divider />;
  }
}

export const dividerBlockPlugin = new DividerBlockPlugin();
