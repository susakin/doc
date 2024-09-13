import { RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import { Editor, Transforms, Element as SlateElement } from "slate";
import { ReactEventMap } from "../../event/react";
import { getAttributeAtCursor, isBlockActive } from "../../utils";
import { EDITOR_EVENT } from "../../event/action";
import styles from "./index.module.less";
import { isHotkey } from "../../utils/isHotkey";

const classNamePrefix = "heading";

export const HEADING_KEY = "heading";

const HOTKEYS: Record<string, string> = {
  "ctrl+alt+1": "h1",
  "ctrl+alt+2": "h2",
  "ctrl+alt+3": "h3",
  "ctrl+alt+4": "h4",
  "ctrl+alt+5": "h5",
  "ctrl+alt+6": "h6",
  "ctrl+alt+7": "h7",
  "ctrl+alt+8": "h8",
  "ctrl+alt+9": "h9",
};

export class HeadingPlugin extends BlockPlugin {
  public readonly key: string = HEADING_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const heading = getAttributeAtCursor(this.editor, HEADING_KEY);
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive: !!heading,
        heading,
      });
    });
  }

  public match({ element }: RenderElementProps): boolean {
    return !!element[HEADING_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event.nativeEvent)) {
        event.preventDefault();
        const heading = HOTKEYS[hotkey];
        this.onCommand({ heading });
      }
    }
  };

  public onCommand: CommandFn = ({ heading }) => {
    if (this.editor) {
      const isActive = isBlockActive(this.editor, heading, "heading");
      Transforms.setNodes(this.editor, {
        heading: isActive ? undefined : heading,
      });
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    const { children, element } = context;
    const heading = element.heading;
    if (heading) {
      const headingStyles: Record<string, string> = {
        h1: styles[`${classNamePrefix}-1`],
        h2: styles[`${classNamePrefix}-2`],
        h3: styles[`${classNamePrefix}-3`],
        h4: styles[`${classNamePrefix}-4`],
        h5: styles[`${classNamePrefix}-5`],
        h6: styles[`${classNamePrefix}-6`],
        h7: styles[`${classNamePrefix}-7`],
        h8: styles[`${classNamePrefix}-8`],
        h9: styles[`${classNamePrefix}-9`],
      };
      return <div className={headingStyles[heading as any]}>{children}</div>;
    }
    return null as any;
  }
}

export const headingPlugin = new HeadingPlugin();
