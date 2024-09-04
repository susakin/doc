import { BaseEditor } from "slate";
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
  EDITOR_CHANGE: "EDITOR_CHANGE",
  ACTIVE_CHANGE: "ACTIVE_CHANGE",
  ...REACT_EVENTS,
} as const;

export type ActiveChangePayload = {
  isActive: boolean;
  [x: string]: any;
};

type EditorEventMap = {
  [EDITOR_EVENT.EDITOR_CHANGE]: BaseEditor;
  [EDITOR_EVENT.ACTIVE_CHANGE]: ActiveChangePayload;
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
