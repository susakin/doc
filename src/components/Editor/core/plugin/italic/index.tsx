import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Editor } from "slate";
import { ReactEventMap } from "../../event/react";
import { getAttributeAtCursor, isMarkActive } from "../../utils";
import { EDITOR_EVENT } from "../../event/action";
import { isHotkey } from "../../utils/isHotkey";

export const ITALIC_KEY = "italic";

const HOTKEYS: Record<string, string> = {
  "ctrl+i": ITALIC_KEY,
};

export class ItalicPlugin extends LeafPlugin {
  public readonly key: string = ITALIC_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const italic = getAttributeAtCursor(this.editor, ITALIC_KEY);
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive: !!italic,
        italic,
      });
    });
  }

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[ITALIC_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event.nativeEvent)) {
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
        Editor.removeMark(this.editor, italic);
      } else {
        Editor.addMark(this.editor, italic, true);
      }
    }
  };

  public render(context: LeafContext): JSX.Element {
    const { children } = context;
    return <i style={{ fontStyle: "italic" }}>{children}</i>;
  }
}

export const italicPlugin = new ItalicPlugin();
