import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import { Transforms } from "slate";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { isHotkey } from "../../utils/isHotkey";
import { EDITOR_EVENT } from "../../event/action";

export const ALIGN_KEY = "align";

export type Align = "left" | "right" | "center";

const HOTKEYS: Record<string, Align> = {
  "ctrl+shift+l": "left",
  "ctrl+shift+r": "right",
  "ctrl+shift+e": "center",
};

export class AlignPlugin extends BlockPlugin {
  public readonly key: string = ALIGN_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, (element) => {
      const align = (element as any)?.[this.key];
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        align,
      });
    });
    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public match(props: RenderElementProps): boolean {
    return !!props.element[ALIGN_KEY];
  }

  public getCurrentStatus = () => {
    const align = (this.selectedElement as any)?.[this.key];
    return {
      align,
    };
  };

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event.nativeEvent)) {
        event.preventDefault();
        const align = HOTKEYS[hotkey];
        this.onCommand({ align });
      }
    }
  };

  public onCommand: CommandFn = ({ align }) => {
    if (this.editor) {
      const at = ReactEditor.findPath(
        this.editor as any,
        this.selectedElement as any
      );
      Transforms.setNodes(
        this.editor,
        {
          align,
        },
        { at }
      );
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, { align });
      this.event.trigger(EDITOR_EVENT.SELECTION_CHANGE, this.editor.selection);
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    const { props } = context;
    context.style = { ...context.style, textAlign: props.element.align };
    return context.children;
  }
}

export const alignPlugin = new AlignPlugin();
