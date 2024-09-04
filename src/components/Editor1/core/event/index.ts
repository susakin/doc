import type { BaseRange } from "../delta";

import type { EditorKit } from "../editor";
import { EventBus } from "./bus";
import { EDITOR_EVENT } from "./bus/action";
export class Event {
  private bus: EventBus;

  constructor(private editor: EditorKit) {
    this.bus = new EventBus();
    this.initEditorEvent();
  }

  private initEditorEvent = () => {
    // NOTE: 分发`Apply`的内容变更与选区变换事件
    const engine = this.editor.raw;
    const apply = engine.apply;
    engine.apply = (event) => {
      if (event.type === "set_selection") {
        this.editor.event.trigger(EDITOR_EVENT.SELECTION_CHANGE, {
          previous: event.properties as BaseRange | null,
          current: event.newProperties as BaseRange | null,
        });
      } else {
        this.editor.event.trigger(EDITOR_EVENT.CONTENT_CHANGE, {
          change: event,
        });
      }
      apply(event);
    };
  };

  public on: EventBus["on"] = (key, listener, priority) => {
    return this.bus.on(key, listener, priority);
  };

  public once: EventBus["once"] = (key, listener, priority) => {
    return this.bus.once(key, listener, priority);
  };

  public off: EventBus["off"] = (key, listener) => {
    return this.bus.off(key, listener);
  };

  public trigger: EventBus["trigger"] = (key, payload) => {
    return this.bus.trigger(key, payload);
  };

  public destroy = () => {
    this.bus.clear();
  };
}
