import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Editor, Transforms } from "slate";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { isMarkActive, isText } from "../../utils";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { isHotkey } from "../../utils/isHotkey";

export const BOLD_KEY = "bold";

const HOTKEYS: Record<string, string> = {
  "ctrl+b": BOLD_KEY,
};

export class BoldPlugin extends LeafPlugin {
  public readonly key: string = BOLD_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const isActive = isMarkActive(this.editor as any, BOLD_KEY);
      const payload = {
        isActive,
      };
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, payload);
    });
    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public getCurrentStatus = () => {
    const isActive = isMarkActive(this.editor as any, BOLD_KEY);
    return {
      isActive,
    };
  };

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[BOLD_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event.nativeEvent)) {
        event.preventDefault();
        const bold = HOTKEYS[hotkey];
        this.onCommand({ bold });
      }
    }
  };

  public onCommand: CommandFn = ({ bold }) => {
    if (this.editor) {
      const isActive = isMarkActive(this.editor, bold);
      if (isActive) {
        Editor.removeMark(this.editor, bold);
      } else {
        Editor.addMark(this.editor, bold, true);
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
    const { children } = context;
    return <strong style={{ fontWeight: "bold" }}>{children}</strong>;
  }
}

export const boldPlugin = new BoldPlugin();
