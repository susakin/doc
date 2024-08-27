import { BaseEditor } from "slate";

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
} as const;

type EditorEventMap = {
  [EDITOR_EVENT.EDITOR_CHANGE]: (editor: BaseEditor) => void;
};

export type EventMap = EditorEventMap;

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
