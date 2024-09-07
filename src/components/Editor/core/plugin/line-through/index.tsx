import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Editor } from "slate";
import { ReactEventMap } from "../../event/react";
import isHotkey from "is-hotkey";
import { isMarkActive } from "../utils";
import { EDITOR_EVENT } from "../../event/action";

export const LINETHROUGH_KEY = "line-through";

const HOTKEYS: Record<string, string> = {
  "ctrl+i": "line-through",
};

export class LineThroughPlugin extends LeafPlugin {
  public readonly key: string = LINETHROUGH_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.EDITOR_CHANGE, (editor) => {
      const isActive = isMarkActive(editor, "line-through");
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive,
      });
    });
  }

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[LINETHROUGH_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const lineThrough = HOTKEYS[hotkey];
        this.onCommand({ lineThrough });
      }
    }
  };

  public onCommand: CommandFn = ({ lineThrough }) => {
    if (this.editor) {
      const isActive = isMarkActive(this.editor, lineThrough);
      if (isActive) {
        Editor.removeMark(this.editor, "line-through");
      } else {
        Editor.addMark(this.editor, "line-through", true);
      }
    }
  };

  public render(context: LeafContext): JSX.Element {
    const { element, props } = context;
    const style = {
      "text-decoration-skip-ink": "none",
      "text-underline-offset": "0.2em",
      "text-decoration": "line-through",
    };
    context.style = (element.lineThrough ? style : {}) as React.CSSProperties;
    return props.children;
  }
}

export const lineThroughPlugin = new LineThroughPlugin();
