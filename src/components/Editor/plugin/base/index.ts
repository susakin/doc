import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";
import { BaseEditor, Editor, Transforms } from "slate";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { EventBus } from "../../event";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { isHotkey } from "../../utils/isHotkey";
import { getSelectionAboveNode, isMarkActive } from "../../utils/slateHelper";

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
  classNameList?: string[];
};

export type LeafContext = {
  props: RenderLeafProps;
  leaf: RenderLeafProps["leaf"];
  element: RenderLeafProps["text"];
  style?: React.CSSProperties;
  children: JSX.Element;
  classNameList?: string[];
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

  public insertNodeAfterSelectedElement(
    props: any,
    extra?: Record<string, any>
  ) {
    const path = ReactEditor.findPath(
      this.editor as any,
      this.selectedElement as any
    );
    ReactEditor.focus(this.editor as any);
    Editor.withoutNormalizing(this.editor as any, () => {
      if (!path.length) return void 0;
      const nextPath = path.slice(0, -1);
      const lastPath = path[path.length - 1] + 1;
      nextPath.push(lastPath);
      Transforms.insertNodes(
        this.editor as any,
        { children: [{ text: "" }], [this.key]: props, ...extra },
        { at: nextPath, select: true }
      );
    });
  }

  constructor() {
    super();
    this.event.on(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, (element) => {
      this.selectedElement = element;
    });
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const element = getSelectionAboveNode(this.editor);
      this.event.trigger(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, element);
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

export abstract class SampleLeafPlugin extends LeafPlugin {
  public abstract readonly hotkey: string;

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const isActive = isMarkActive(this.editor as any, this.key);
      const payload = {
        isActive,
      };
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, payload);
    });
    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public getCurrentStatus = () => {
    const bold = isMarkActive(this.editor as any, this.key);
    return {
      isActive: !!bold,
    };
  };

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    if (isHotkey(this.hotkey, event.nativeEvent)) {
      event.preventDefault();
      this.onCommand(undefined as any);
    }
  };

  public onCommand: CommandFn = () => {
    const key = this.key;
    if (this.editor) {
      const isActive = isMarkActive(this.editor, key);
      if (isActive) {
        Editor.removeMark(this.editor, key);
      } else {
        Editor.addMark(this.editor, key, true);
      }

      setTimeout(() => {
        this.event.trigger(
          EDITOR_EVENT.SELECTION_CHANGE,
          this.editor?.selection as any
        );
      });
    }
  };
}

export type EditorPlugin = BlockPlugin | LeafPlugin | SampleLeafPlugin;
