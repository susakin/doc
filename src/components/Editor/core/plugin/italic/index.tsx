import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Editor } from "slate";
import { ReactEventMap } from "../../event/react";
import isHotkey from "is-hotkey";
import { isMarkActive } from "../utils";
import { EDITOR_EVENT } from "../../event/action";

export const ITALIC_KEY = "italic";

const HOTKEYS: Record<string, string> = {
  "ctrl+i": "italic",
};

export class ItalicPlugin extends LeafPlugin {
  public readonly key: string = ITALIC_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.EDITOR_CHANGE, (editor) => {
      const isActive = isMarkActive(editor, "italic");
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive,
      });
    });
  }

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[ITALIC_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const italic = HOTKEYS[hotkey];
        this.onCommand({ italic });
      }
    }
  };

  public onCommand: CommandFn = ({ italic }) => {
    if (this.editor) {
      const isActive = isMarkActive(this.editor, italic);
      if (isActive) {
        Editor.removeMark(this.editor, "italic");
      } else {
        Editor.addMark(this.editor, "italic", true);
      }
    }
  };

  public render(context: LeafContext): JSX.Element {
    const { element, props } = context;
    context.style = { fontWeight: element.italic ? "italic" : "" };
    return props.children;
  }
}

export const italicPlugin = new ItalicPlugin();
