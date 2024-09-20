import { RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import { Transforms } from "slate";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { isHotkey } from "../../utils/isHotkey";
import { getAttributeAtCursor, isBlockActive } from "../../utils";
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
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const align = getAttributeAtCursor(this.editor, "align");
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive: !!align,
        align,
      });
    });
    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public match(props: RenderElementProps): boolean {
    return !!props.element[ALIGN_KEY];
  }

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
      const isActive = isBlockActive(this.editor, ALIGN_KEY, align);
      Transforms.setNodes(this.editor, {
        align: isActive ? undefined : align,
      });
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    const { props } = context;
    context.style = { ...context.style, textAlign: props.element.align };
    return context.children;
  }
}

export const alignPlugin = new AlignPlugin();
