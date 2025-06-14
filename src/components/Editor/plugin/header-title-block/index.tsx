import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import styles from "./index.module.less";
import cs from "classnames";
import { ALIGN_KEY } from "../align";
import {
  isEmptyElement,
  isFocusLineEnd,
  isMatchedEvent,
} from "../../utils/slateHelper";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { Path, Transforms } from "slate";
import { KEYBOARD } from "../../utils/constant";
import { TEXT_BLOCK_KEY } from "../text-block";

export const HEADER_TITLE_KEY = "header-title-block";

const classNamePrefix = "header-title-block";

export class HeaderTitleBlockPlugin extends BlockPlugin {
  public readonly key: string = HEADER_TITLE_KEY;
  constructor() {
    super();
    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public matchNatureKeyboard(event: ReactEventMap["react_keydown"]) {
    const editor = this.editor as any;
    const element = this.selectedElement as any;
    if (!element?.[this.key]) return false;
    if (isMatchedEvent(event, KEYBOARD.ENTER)) {
      //删除
      const path = ReactEditor.findPath(editor as any, element as any);
      if (isFocusLineEnd(editor, path)) {
        event.preventDefault();
        Transforms.insertNodes(editor, { children: [{ text: "" }] });
        return;
      }
      Transforms.setNodes(
        editor,
        { [this.key]: undefined, [TEXT_BLOCK_KEY]: true },
        {
          at: Path.next(path),
        }
      );
    }
  }

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    this.matchNatureKeyboard(event);
  };

  public onCommand?: CommandFn | undefined;

  public match(props: RenderElementProps): boolean {
    return !!props.element[HEADER_TITLE_KEY];
  }

  public destroy?: (() => void) | undefined;

  public renderLine(context: BlockContext): JSX.Element {
    const { children, element } = context;
    const path = ReactEditor.findPath(this.editor as any, element as any);
    const isEmpty = isEmptyElement(this.editor as any, path);

    return (
      <div
        className={cs(
          styles[`${classNamePrefix}`],
          {
            [styles[`${classNamePrefix}-empty`]]: isEmpty,
          },
          styles[`${classNamePrefix}-align-${element?.[ALIGN_KEY]}`]
        )}
        data-placeholder={isEmpty ? "请输入标题" : undefined}
      >
        {children}
      </div>
    );
  }
}

export const headerTitleBlockPlugin = new HeaderTitleBlockPlugin();
