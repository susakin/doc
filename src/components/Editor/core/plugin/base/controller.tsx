import { RenderElementProps, RenderLeafProps } from "slate-react";
import {
  BlockContext,
  BlockPlugin,
  EditorPlugin,
  LeafPlugin,
  PLUGIN_TYPE,
} from ".";
import { EventBus } from "../../event";
import { EDITOR_EVENT } from "../../event/action";
import { REACT_EVENTS } from "../../event/react";
import Block from "../../components/Block";
import Leaf from "../../components/Leaf";

const DEFAULT_PRIORITY = 100;

export class PluginController {
  public blocks: BlockPlugin[];
  public leaves: LeafPlugin[];
  private pluginMap: Record<string, EditorPlugin>;
  public event: EventBus;
  constructor() {
    this.pluginMap = {};
    this.blocks = [];
    this.leaves = [];
    this.event = new EventBus();
    this.eventListener();
  }

  public eventListener() {
    //监听编辑变化
    this.event.on(EDITOR_EVENT.EDITOR_CHANGE, (editor) => {
      for (const item of Object.values(this.pluginMap)) {
        item.setEditor(editor);
        item.event.trigger(EDITOR_EVENT.EDITOR_CHANGE, editor);
      }
    });
    //监听键盘事件
    this.event.on(REACT_EVENTS.KEY_DOWN, (event) => {
      for (const item of Object.values(this.pluginMap)) {
        item.onKeyDown?.(event);
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
    let children;
    const context: BlockContext = {
      props,
      element: props.element,
    };
    for (const item of this.blocks) {
      if (item.match(props) && item.render) {
        children = item.render(context);
        break;
      }
    }

    for (let i = this.blocks.length - 1; i >= 0; i--) {
      const item = this.blocks[i];
      if (item.match(props) && item.renderLine) {
        children = item.renderLine(context);
      }
    }

    return <Block {...context}>{children ?? props.children}</Block>;
  };

  public renderLeaf = (props: RenderLeafProps) => {
    let children;
    for (const item of this.leaves) {
      if (item.match(props) && item.render) {
        children = item.render(props);
        break;
      }
    }
    return <Leaf {...props.attributes}>{children ?? props.children}</Leaf>;
  };
}

export const pluginController = new PluginController();
