import { RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import { Editor, Transforms, Element as SlateElement } from "slate";
import { ReactEventMap } from "../../event/react";
import isHotkey from "is-hotkey";
import { isBlockActive } from "../utils";
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
    this.event.on(EDITOR_EVENT.EDITOR_CHANGE, (editor) => {
      const { selection } = editor;
      if (!selection) return false;
      for (const align of Object.values(HOTKEYS)) {
        const [match] = Array.from(
          Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n["align"] === align,
          })
        );
        const isActive = !!match;
        if (isActive) {
          this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
            isActive: true,
            align,
          });
          return;
        }
      }
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive: false,
      });
    });
  }

  public match(props: RenderElementProps): boolean {
    console.log(props, "align,render1");
    return !!props.element[ALIGN_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const align = HOTKEYS[hotkey];
        console.log(align, "align");
        this.onCommand({ align });
      }
    }
  };

  public onCommand: CommandFn = ({ align }) => {
    if (this.editor) {
      const isActive = isBlockActive(this.editor, align, "align");
      Transforms.setNodes(this.editor, {
        align: isActive ? undefined : align,
      });
    }
  };

  public render(context: BlockContext): JSX.Element {
    const { props } = context;
    context.style = { textAlign: props.element.align };
    return props.children;
  }
}

export const alignPlugin = new AlignPlugin();
