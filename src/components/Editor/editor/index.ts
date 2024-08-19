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
  }

  public destroy(): void {
    this.command.destroy();
    this.event.destroy();
  }
}
