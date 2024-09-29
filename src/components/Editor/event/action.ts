import { BaseEditor, BaseSelection } from "slate";
import type { ReactEventMap } from "./react";
import { REACT_EVENTS } from "./react";

export declare namespace Object {
  type KeyType = string | number | symbol;
  type Any = Record<KeyType, any>;
  type Never = Record<KeyType, never>;
  type Unknown = Record<KeyType, unknown>;
  type Keys<T extends Record<Object.KeyType, unknown>> = keyof T;
  type Values<T extends Record<Object.KeyType, unknown>> = T[keyof T];
}
export const EDITOR_EVENT = {
  ACTIVE_CHANGE: "ACTIVE_CHANGE",
  SELECTION_CHANGE: "SELECTION_CHANGE",
  BASE_EDITOR_CHANGE: "BASE_EDITOR_CHANGE",
  READONLY_CHANGE: "READONLY_CHANGE",
  PLUGIN_COMMANT: "PLUGIN_COMMANT",
  ...REACT_EVENTS,
} as const;

export type ActiveChangePayload = {
  isActive?: boolean;
  [x: string]: any;
};

type EditorEventMap = {
  [EDITOR_EVENT.ACTIVE_CHANGE]: ActiveChangePayload;
  [EDITOR_EVENT.SELECTION_CHANGE]: BaseSelection;
  [EDITOR_EVENT.BASE_EDITOR_CHANGE]: BaseEditor;
  [EDITOR_EVENT.READONLY_CHANGE]: boolean;
  [EDITOR_EVENT.PLUGIN_COMMANT]: Record<string, any>;
};

export type EventMap = EditorEventMap & ReactEventMap;

export type EventType = Object.Values<typeof EDITOR_EVENT>;
export type Handler<T extends EventType> = {
  once: boolean;
  priority: number;
  listener: Listener<T>;
};
export type WithStop<T> = T & {
  stop: () => void;
  prevent: () => void;
  _raw: T;
  _key: string;
};
export type Listener<T extends EventType> = (
  value: WithStop<EventMap[T]>
) => void;
export type Listeners = { [T in EventType]?: Handler<T>[] };
