import { RenderElementProps, RenderLeafProps } from "slate-react";
import { BaseEditor } from "slate";
import { ReactEventMap } from "../../event/react";
import { EventBus } from "../../event";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { getSelectionAboveNode } from "../../utils";

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

  /** 是否只读 */
  public readonly?: boolean;

  /** 插件命令注册 */
  public abstract onCommand?: CommandFn;

  public editor?: BaseEditor;

  public abstract destroy?: () => void;
  public onKeyDown?: (event: ReactEventMap["react_keydown"]) => void;

  public readonly event: EventBus = new EventBus();

  public getCurrentStatus?: () => PluginActiveChangePayload;

  constructor() {
    this.event.on(EDITOR_EVENT.BASE_EDITOR_CHANGE, (editor) => {
      this.editor = editor;
    });

    this.event.on(EDITOR_EVENT.READONLY_CHANGE, (readonly) => {
      this.readonly = !!readonly;
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

  public selectedElement?: RenderElementProps["element"];

  public isHoverMenuActive?: boolean = false;

  public setSelectedElement(element: RenderElementProps["element"]) {
    this.selectedElement = element;
    this.event.trigger(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, element);
  }

  constructor() {
    super();
    this.event.on(EDITOR_EVENT.ELEMENT_MOUSE_ENTER, ({ element }) => {
      if (!this.isHoverMenuActive) {
        this.setSelectedElement(element);
      }
    });
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const element = getSelectionAboveNode(this.editor);
      this.setSelectedElement(element);
    });
  }
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
