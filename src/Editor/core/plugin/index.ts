import { RenderElementProps, RenderLeafProps } from "slate-react";

export const PLUGIN_TYPE = {
  BLOCK: "BLOCK" as const,
  INLINE: "INLINE" as const,
};

abstract class BasePlugin {
  /** 插件唯一标识 */
  public abstract readonly key: string;
  /** 插件类型 */
  public abstract readonly type: keyof typeof PLUGIN_TYPE;
  public readonly priority?: number;
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
