import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { ReactEventMap } from "../../event/react";
import { isText } from "../../utils";
import styles from "./index.module.less";

const classNamePrefix = "mock-selection";

export const MOCK_SELECTION_KEY = "mock-selection";

export class MockSelectionPlugin extends LeafPlugin {
  public readonly key: string = MOCK_SELECTION_KEY;
  public element: RenderLeafProps["text"];

  constructor() {
    super();
    this.element = null as any;
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
          {
            match: (node) => {
              return isText(node);
            },
            split: true,
            at: location,
          }
        );
      } else {
        const path = ReactEditor.findPath(this.editor as any, this.element);
        Transforms.unsetNodes(this.editor, [this.key], {
          match: isText,
          split: true,
          at: path,
        });
      }
    }
  };

  public render(context: LeafContext): JSX.Element {
    const { children, element } = context;
    this.element = element;
    return <span className={styles[`${classNamePrefix}`]}>{children}</span>;
  }
}

export const mockSelectionPlugin = new MockSelectionPlugin();
