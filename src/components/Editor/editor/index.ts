import type { Editor } from "../delta";
import type { ReactEditor } from "../delta";
import { createEditor } from "../delta";
import { withHistory } from "../delta";
import { withReact } from "../delta";
import { DEFAULT_OPTIONS } from "./constant";
import type { EditorOptions, EditorRaw } from "./types";
import { Selection } from "../selection";
import { Event } from "../event";

export class EditorKit {
  /** 原始对象 */
  public readonly raw: EditorRaw;
  /** 初始化参数 */
  public readonly options: EditorOptions;
  /** 选区模块 */
  public readonly selection: Selection;
  /** 事件监听与分发 */
  public readonly event: Event;

  constructor(options?: Partial<EditorOptions>) {
    const raw = withReact(createEditor() as Editor & ReactEditor);
    this.options = { ...DEFAULT_OPTIONS, ...options };

    this.raw = this.options.history ? withHistory(raw) : (raw as EditorRaw);
    this.selection = new Selection(this);
    this.event = new Event(this);
  }
}
