import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Editor } from "slate";
import { ReactEventMap } from "../../event/react";
import { isMarkActive } from "../../utils";
import { EDITOR_EVENT } from "../../event/action";
import styles from "./index.module.less";

const classNamePrefix = "mock-selection";

export const MOCK_SELECTION_KEY = "mock-selection";

export class MockSelectionPlugin extends LeafPlugin {
  public readonly key: string = MOCK_SELECTION_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {}

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[MOCK_SELECTION_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {};

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
    return <span className={styles[`${classNamePrefix}`]}>{children}</span>;
  }
}

export const mockSelectionPlugin = new MockSelectionPlugin();
