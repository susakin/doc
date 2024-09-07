import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Editor } from "slate";
import { ReactEventMap } from "../../event/react";
import isHotkey from "is-hotkey";
import { isMarkActive } from "../utils";
import { EDITOR_EVENT } from "../../event/action";

export const UNDERLINE_KEY = "under-line";

const HOTKEYS: Record<string, string> = {
  "ctrl+u": "under-line",
};

export class UnderLinePlugin extends LeafPlugin {
  public readonly key: string = UNDERLINE_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.EDITOR_CHANGE, (editor) => {
      const isActive = isMarkActive(editor, "underLine");
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive,
      });
    });
  }

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[UNDERLINE_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const underLine = HOTKEYS[hotkey];
        this.onCommand({ underLine });
      }
    }
  };

  public onCommand: CommandFn = ({ underLine }) => {
    if (this.editor) {
      const isActive = isMarkActive(this.editor, underLine);
      if (isActive) {
        Editor.removeMark(this.editor, "underLine");
      } else {
        Editor.addMark(this.editor, "underLine", true);
      }
    }
  };

  public render(context: LeafContext): JSX.Element {
    const { element, props } = context;
    const style = {
      "text-decoration-skip-ink": "none",
      "text-underline-offset": "0.2em",
      "text-decoration": "underline",
    };
    context.style = (element.underLine ? style : {}) as React.CSSProperties;
    return props.children;
  }
}

export const underLinePlugin = new UnderLinePlugin();
