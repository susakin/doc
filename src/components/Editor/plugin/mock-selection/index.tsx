import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Editor, Transforms } from "slate";
import { ReactEventMap } from "../../event/react";
import { isMarkActive, isText } from "../../utils";
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

  public onCommand: CommandFn = ({ isActive, location }) => {
    if (this.editor) {
      if (isActive) {
        Transforms.setNodes(
          this.editor,
          {
            [this.key]: true,
          },
          { match: isText as any, split: true, at: location }
        );
      } else {
        Transforms.unsetNodes(this.editor, [this.key], {
          match: isText as any,
          split: true,
          at: location,
        });
      }
    }
  };

  public render(context: LeafContext): JSX.Element {
    const { children } = context;
    return <span className={styles[`${classNamePrefix}`]}>{children}</span>;
  }
}

export const mockSelectionPlugin = new MockSelectionPlugin();
