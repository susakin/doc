import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Editor } from "slate";
import { ReactEventMap } from "../../event/react";
import { isMarkActive } from "../../utils";
import { EDITOR_EVENT } from "../../event/action";
import { isHotkey } from "../../utils/isHotkey";

export const LINETHROUGH_KEY = "line-through";

const HOTKEYS: Record<string, string> = {
  "ctrl+shift+X": LINETHROUGH_KEY,
};

export class LineThroughPlugin extends LeafPlugin {
  public readonly key: string = LINETHROUGH_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.EDITOR_CHANGE, (editor) => {
      const isActive = isMarkActive(editor, LINETHROUGH_KEY);
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive,
      });
    });
  }

  public match(props: RenderLeafProps): boolean {
    console.log(!!props.leaf[LINETHROUGH_KEY], "!!props.leaf[LINETHROUGH_KEY]");
    return !!props.leaf[LINETHROUGH_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event.nativeEvent)) {
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
        Editor.removeMark(this.editor, lineThrough);
      } else {
        Editor.addMark(this.editor, lineThrough, true);
      }
    }
  };

  public render(context: LeafContext): JSX.Element {
    const { children } = context;
    return (
      <del
        style={{
          ["text-decoration-skip-ink" as any]: "none",
          ["text-underline-offset" as any]: "0.2em",
          ["text-decoration" as any]: "line-through",
        }}
      >
        {children}
      </del>
    );
  }
}

export const lineThroughPlugin = new LineThroughPlugin();
