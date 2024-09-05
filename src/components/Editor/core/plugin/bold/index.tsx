import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Editor } from "slate";
import { ReactEventMap } from "../../event/react";
import isHotkey from "is-hotkey";
import { isMarkActive } from "../utils";
import { EDITOR_EVENT } from "../../event/action";

export const BOLD_KEY = "bold";

const HOTKEYS: Record<string, string> = {
  "ctrl+b": "bold",
};

export class BoldPlugin extends LeafPlugin {
  public readonly key: string = BOLD_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.EDITOR_CHANGE, (editor) => {
      const isActive = isMarkActive(editor, "bold");
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive,
      });
    });
  }

  public match(props: RenderLeafProps): boolean {
    console.log(props.leaf[BOLD_KEY], "props.leaf");
    return !!props.leaf[BOLD_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
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
        Editor.removeMark(this.editor, "bold");
      } else {
        Editor.addMark(this.editor, "bold", true);
      }
    }
  };

  public render(context: LeafContext): JSX.Element {
    const { element, props } = context;
    context.style = { fontWeight: element.bold ? "bold" : "" };
    return props.children;
  }
}

export const boldPlugin = new BoldPlugin();
