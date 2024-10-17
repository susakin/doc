import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import { Transforms } from "slate";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { isHotkey } from "../../utils/isHotkey";
import { EDITOR_EVENT } from "../../event/action";

export const INDENT_KEY = "indent";

const HOTKEYS: Record<string, boolean> = {
  tab: true,
  "shift+tab": false,
};

export class IndentPlugin extends BlockPlugin {
  public readonly key: string = INDENT_KEY;
  public priority: number = 99;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, (element) => {
      const indent = (element as any)?.[this.key];

      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: !!indent,
        indent,
      });
    });

    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public match(props: RenderElementProps): boolean {
    return !!props.element[INDENT_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event.nativeEvent)) {
        event.preventDefault();
        const indent = HOTKEYS[hotkey];
        this.onCommand({ indent });
      }
    }
  };

  public getCurrentStatus = () => {
    const indent = (this.selectedElement as any)?.[this.key];
    return {
      indent,
    };
  };

  public onCommand: CommandFn = ({ indent }) => {
    if (this.editor) {
      const at = ReactEditor.findPath(
        this.editor as any,
        this.selectedElement as any
      );
      Transforms.setNodes(
        this.editor,
        {
          indent,
        },
        { at }
      );
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, { indent });
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    const { props, element } = context;

    context.style = {
      ...context.style,
      textIndent: element[INDENT_KEY] ? "2em" : undefined,
    };
    return props.children;
  }
}

export const indentPlugin = new IndentPlugin();
