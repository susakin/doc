import { RenderElementProps, RenderLeafProps } from "slate-react";
import { BaseEditor } from "slate";
import { ReactEventMap } from "../../event/react";
import { EventBus } from "../../event";
import { EDITOR_EVENT } from "../../event/action";

export const PLUGIN_TYPE = {
  BLOCK: "BLOCK" as const,
  INLINE: "INLINE" as const,
};

export type CommandPayload = {
  [key: string]: any;
};

export type CommandFn = (data: CommandPayload) => void | Promise<void>;

abstract class BasePlugin {
  /** 插件唯一标识 */
  public abstract readonly key: string;
  /** 插件类型 */
  public abstract readonly type: keyof typeof PLUGIN_TYPE;
  /** 权重 */
  public readonly priority?: number;

  /** 插件命令注册 */
  public abstract onCommand?: CommandFn;

  public editor?: BaseEditor;

  public abstract destroy?: () => void;
  public onKeyDown?: (event: ReactEventMap["react_keydown"]) => void;

  public event: EventBus = new EventBus();

  constructor() {
    this.event.on(EDITOR_EVENT.BASE_EDITOR_CHANGE, (editor) => {
      this.editor = editor;
    });
  }
}

export type BlockContext = {
  props: RenderElementProps;
  style?: React.CSSProperties;
  children: JSX.Element;
  element: RenderElementProps["element"];
};

export type LeafContext = {
  props: RenderLeafProps;
  leaf: RenderLeafProps["leaf"];
  element: RenderLeafProps["text"];
  style?: React.CSSProperties;
  children: JSX.Element;
};

export abstract class BlockPlugin extends BasePlugin {
  /** 块级节点类型 */
  public readonly type = PLUGIN_TYPE.BLOCK;
  /** 块节点匹配插件 */
  public abstract match(props: RenderElementProps): boolean;
  /** 渲染块级子节点 */
  public render?(props: BlockContext): JSX.Element;
  /** 渲染行节点 */
  public renderLine?(context: BlockContext): JSX.Element;
}

export abstract class LeafPlugin extends BasePlugin {
  /** 块级节点类型 */
  public readonly type = PLUGIN_TYPE.INLINE;
  /** 行内节点匹配插件 */
  public abstract match(props: RenderLeafProps): boolean;
  /** 渲染行内节点 */
  public render?(props: LeafContext): JSX.Element;
}

export type EditorPlugin = BlockPlugin | LeafPlugin;
