import { RenderElementProps, RenderLeafProps } from "slate-react";
import { BaseEditor } from "slate";
import { ReactEventMap } from "../event/react";

export const PLUGIN_TYPE = {
  BLOCK: "BLOCK" as const,
  INLINE: "INLINE" as const,
};

abstract class BasePlugin {
  /** 插件唯一标识 */
  public abstract readonly key: string;
  /** 插件类型 */
  public abstract readonly type: keyof typeof PLUGIN_TYPE;
  /** 权重 */
  public readonly priority?: number;

  public editor?: BaseEditor;

  public abstract destroy?: () => void;
  public abstract onEditorChange?: (editor: BaseEditor) => void;
  public abstract onKeyDown?: (event: ReactEventMap["react_keydown"]) => void;

  public setEditor: (editor: BaseEditor) => void = (editor) => {
    this.editor = editor;
  };
}

export abstract class BlockPlugin extends BasePlugin {
  /** 块级节点类型 */
  public readonly type = PLUGIN_TYPE.BLOCK;
  /** 块节点匹配插件 */
  public abstract match(props: RenderElementProps): boolean;
  /** 渲染块级子节点 */
  public render?(props: RenderElementProps): JSX.Element;
}

export abstract class LeafPlugin extends BasePlugin {
  /** 块级节点类型 */
  public readonly type = PLUGIN_TYPE.INLINE;
  /** 行内节点匹配插件 */
  public abstract match(props: RenderLeafProps): boolean;
  /** 渲染行内节点 */
  public render?(props: RenderLeafProps): JSX.Element;
}

export type EditorPlugin = BlockPlugin | LeafPlugin;
