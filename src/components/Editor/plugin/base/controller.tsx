import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";
import {
  BlockContext,
  BlockPlugin,
  EditorPlugin,
  LeafContext,
  LeafPlugin,
  PLUGIN_TYPE,
} from ".";
import { EventBus } from "../../event";
import { EDITOR_EVENT } from "../../event/action";
import { REACT_EVENTS } from "../../event/react";
import Block from "../../components/Block";
import Leaf from "../../components/Leaf";
import React from "react";
import Void from "../../components/Void";
import { BaseEditor, Transforms } from "slate";
import { DIVIDER_BLOCK_KEY } from "../divider-block";
import { HEADER_TITLE_KEY } from "../header-title-block";
import { ALIGN_KEY } from "../align";
import { getSelectionAboveNode } from "../../utils/slateHelper";

const DEFAULT_PRIORITY = 100;

export class PluginController {
  public blocks: BlockPlugin[];
  public leaves: LeafPlugin[];
  private pluginMap: Record<string, EditorPlugin>;
  public event: EventBus;
  public editor?: BaseEditor;
  public selectedElement?: RenderElementProps["element"];
  public isHoverMenuActive?: boolean = false;
  constructor() {
    this.pluginMap = {};
    this.blocks = [];
    this.leaves = [];
    this.event = new EventBus();
    this.eventListener();
  }

  public setSelectedElement(element: RenderElementProps["element"]) {
    this.selectedElement = element;
    for (const item of Object.values(this.pluginMap)) {
      try {
        item.event.trigger(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, element);
      } catch (e) {}
    }
  }

  public eventListener() {
    //监听键盘事件
    this.event.on(REACT_EVENTS.KEY_DOWN, (event) => {
      if (this.selectedElement?.[DIVIDER_BLOCK_KEY]) {
        this.pluginMap[DIVIDER_BLOCK_KEY]?.event.trigger(
          EDITOR_EVENT.KEY_DOWN,
          event
        );
        return;
      }

      //标题只有align
      if (this.selectedElement?.[HEADER_TITLE_KEY]) {
        this.pluginMap[ALIGN_KEY]?.event.trigger(EDITOR_EVENT.KEY_DOWN, event);
        this.pluginMap[HEADER_TITLE_KEY]?.event.trigger(
          EDITOR_EVENT.KEY_DOWN,
          event
        );
        return;
      }

      for (const item of Object.values(this.pluginMap)) {
        item.event.trigger(EDITOR_EVENT.KEY_DOWN, event);
        if (event.isPropagationStopped()) {
          break;
        }
      }
    });
    //监听光标变化
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, (selection) => {
      const element = getSelectionAboveNode(this.editor);
      this.setSelectedElement(element);

      for (const item of Object.values(this.pluginMap)) {
        item.event.trigger(EDITOR_EVENT.SELECTION_CHANGE, selection);
      }
    });
    //监听基础编辑器变化
    this.event.on(EDITOR_EVENT.BASE_EDITOR_CHANGE, (editor) => {
      this.editor = editor;
      for (const item of Object.values(this.pluginMap)) {
        item.event.trigger(EDITOR_EVENT.BASE_EDITOR_CHANGE, editor);
      }
    });

    //监听基础编辑器变化
    this.event.on(EDITOR_EVENT.READONLY_CHANGE, (readOnly) => {
      for (const item of Object.values(this.pluginMap)) {
        item.event.trigger(EDITOR_EVENT.READONLY_CHANGE, readOnly);
      }
    });

    //监听element mouse enter
    this.event.on(EDITOR_EVENT.ELEMENT_MOUSE_ENTER, ({ element }) => {
      if (!this.isHoverMenuActive) {
        this.setSelectedElement(element);
      }

      for (const item of Object.values(this.pluginMap)) {
        item.event.trigger(EDITOR_EVENT.ELEMENT_MOUSE_ENTER, {
          element,
        } as any);
      }
    });

    //
    this.event.on(EDITOR_EVENT.HOVER_MENU_ACTIVE, (isActive) => {
      this.isHoverMenuActive = isActive;
      for (const item of Object.values(this.pluginMap)) {
        item.event.trigger(EDITOR_EVENT.HOVER_MENU_ACTIVE, isActive);
      }
    });
  }

  public register = (...plugins: EditorPlugin[]) => {
    for (const plugin of plugins) {
      const key = plugin.key;
      const exist = this.pluginMap[key];
      exist && exist.destroy && exist.destroy();
      this.pluginMap[key] = plugin;
    }
  };

  public apply = () => {
    const plugins = Object.values(this.pluginMap);
    const blockPlugins: BlockPlugin[] = [];
    const leafPlugins: LeafPlugin[] = [];
    plugins.sort(
      (a, b) =>
        (b.priority || DEFAULT_PRIORITY) - (a.priority || DEFAULT_PRIORITY)
    );
    plugins.forEach((item) => {
      if (item.type === PLUGIN_TYPE.BLOCK) {
        blockPlugins.push(item);
      } else if (item.type === PLUGIN_TYPE.INLINE) {
        leafPlugins.push(item);
      }
    });
    this.blocks = blockPlugins;
    this.leaves = leafPlugins;
  };

  public reset = () => {
    const plugins = Object.values(this.pluginMap);
    plugins.forEach((node) => node.destroy && node.destroy());
    this.pluginMap = {};
  };

  public destroy = () => {
    this.reset();
    this.event.clear();
    for (const item of Object.values(this.pluginMap)) {
      item.event?.clear();
      item.destroy?.();
    }
  };

  public renderElement = (props: RenderElementProps) => {
    const context: BlockContext = {
      props,
      element: props.element,
      children: props.children,
      classNameList: [],
    };
    for (const item of this.blocks) {
      if (item.match(props) && item.render) {
        context.children = (
          <React.Fragment>
            {props.children}
            {<Void>{item.render(context)}</Void>}
          </React.Fragment>
        );
        break;
      }
    }

    for (let i = this.blocks.length - 1; i >= 0; i--) {
      const item = this.blocks[i];
      if (item.match(props) && item.renderLine) {
        context.children = item.renderLine(context);
      }
    }

    return <Block {...context}>{context.children}</Block>;
  };

  public renderLeaf = (props: RenderLeafProps) => {
    const context: LeafContext = {
      props,
      leaf: props.leaf,
      element: props.text,
      children: props.children,
      classNameList: [],
    };
    for (const item of this.leaves) {
      if (item.match(props) && item.render) {
        context.children = item.render(context);
      }
    }
    return <Leaf {...context}>{context.children}</Leaf>;
  };

  public getSelectedElementPath() {
    if (this.editor && this.selectedElement) {
      return ReactEditor.findPath(
        this.editor as any,
        this.selectedElement as any
      );
    }
    return [];
  }

  public deleteSlectedElement() {
    if (this.editor && this.selectedElement) {
      const at = this.getSelectedElementPath();
      ReactEditor.focus(this.editor as any);
      Transforms.select(this.editor, at);
      Promise.resolve().then(() => {
        Transforms.delete(this.editor as any, { at, unit: "block" });
        this.event.trigger(EDITOR_EVENT.ELEMENT_MOUSE_LEAVE, undefined as any);
      });
    }
  }
  public getNextPathAtSelectedElement() {
    if (this.editor && this.selectedElement) {
      const path = this.getSelectedElementPath();
      const nextPath = path.slice(0, -1);
      const lastPath = path[path.length - 1] + 1;
      nextPath.push(lastPath);
      return nextPath;
    }
    return [];
  }
}

export const pluginController = new PluginController();
