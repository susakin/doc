import type { Editor } from "../delta";
import type { ReactEditor } from "../delta";
import { createEditor } from "../delta";
import { withHistory } from "../delta";
import { withReact } from "../delta";
import { DEFAULT_OPTIONS } from "./constant";
import type { EditorOptions, EditorRaw } from "./types";
import { Selection } from "../selection";
import { Event } from "../event";
import { Command } from "../command";
import { Do } from "../do";
import { EditorSchema } from "../schema/types";
import { Schema } from "../schema";
import { Track } from "../track";
import { Clipboard } from "../clipboard";
import { PluginController } from "../plugin";
import { State } from "../state";
import { Reflex } from "../reflex";

export class EditorKit {
  /** 原始对象 */
  public readonly raw: EditorRaw;
  /** 初始化参数 */
  public readonly options: EditorOptions;
  /** 选区模块 */
  public readonly selection: Selection;
  /** 事件监听与分发 */
  public readonly event: Event;
  /** 命令模块 */
  public readonly command: Command;
  /** 内容更新与选区变换 */
  public readonly do: Do;
  /** 配置模块 */
  public readonly schema: Schema;
  /** 历史操作与追踪 */
  public readonly track: Track;
  /** 剪贴板模块 */
  public readonly clipboard: Clipboard;
  /** 插件化控制器 */
  public readonly plugin: PluginController;
  /** 内部状态 */
  public readonly state: State;

  /** 内容节点获取与判断 */
  public readonly reflex: Reflex;

  constructor(config: EditorSchema, options?: Partial<EditorOptions>) {
    const raw = withReact(createEditor() as Editor & ReactEditor);
    this.options = { ...DEFAULT_OPTIONS, ...options };
    const schema = new Schema(config, this);

    this.raw = this.options.history ? withHistory(raw) : (raw as EditorRaw);
    this.selection = new Selection(this);
    this.event = new Event(this);
    this.command = new Command(this);
    this.do = new Do(this);
    this.schema = schema;
    this.track = new Track(this);
    this.clipboard = new Clipboard(this);
    this.plugin = new PluginController(this);
    this.state = new State(this);
    this.reflex = new Reflex(this);
  }

  public destroy(): void {
    this.command.destroy();
    this.event.destroy();
    this.track.destroy();
    this.clipboard.destroy();
    this.plugin.destroy();
  }
}
