import type {
  ContentChangeEvent,
  PaintEvent,
  ReadonlyStateEvent,
  SelectionChangeEvent,
} from "../types/bus";
import type { ReactEventMap } from "../types/react";
import { REACT_EVENTS } from "../types/react";

export const EDITOR_EVENT = {
  CONTENT_CHANGE: "CONTENT_CHANGE",
  SELECTION_CHANGE: "SELECTION_CHANGE",
  PAINT: "PAINT",
  MOUNT: "MOUNT",
  READONLY_CHANGE: "READONLY_CHANGE",
  ...REACT_EVENTS,
} as const;

type EditorEventMap = {
  [EDITOR_EVENT.PAINT]: PaintEvent;
  [EDITOR_EVENT.CONTENT_CHANGE]: ContentChangeEvent;
  [EDITOR_EVENT.SELECTION_CHANGE]: SelectionChangeEvent;
  [EDITOR_EVENT.MOUNT]: PaintEvent;
  [EDITOR_EVENT.READONLY_CHANGE]: ReadonlyStateEvent;
};

export type EventMap = ReactEventMap & EditorEventMap;

//https://www.npmjs.com/package/laser-utils/v/0.0.5-alpha.1?activeTab=code
export declare namespace Object {
  type KeyType = string | number | symbol;
  type Any = Record<KeyType, any>;
  type Never = Record<KeyType, never>;
  type Unknown = Record<KeyType, unknown>;
  type Keys<T extends Record<Object.KeyType, unknown>> = keyof T;
  type Values<T extends Record<Object.KeyType, unknown>> = T[keyof T];
}

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
