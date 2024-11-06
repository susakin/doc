import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import styles from "./index.module.less";
import cs from "classnames";
import { ALIGN_KEY } from "../align";
import { isEmptyElement } from "../../utils/slateHelper";

export const HEADER_TITLE_KEY = "header-title-block";

const classNamePrefix = "header-title-block";

export class HeaderTitleBlockPlugin extends BlockPlugin {
  public readonly key: string = HEADER_TITLE_KEY;
  constructor() {
    super();
  }

  public onCommand?: CommandFn | undefined;

  public match(props: RenderElementProps): boolean {
    return !!props.element[HEADER_TITLE_KEY];
  }

  public destroy?: (() => void) | undefined;

  public renderLine(context: BlockContext): JSX.Element {
    const { children, element } = context;
    const path = ReactEditor.findPath(this.editor as any, element as any);
    const isEmpty = isEmptyElement(this.editor, path);

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
