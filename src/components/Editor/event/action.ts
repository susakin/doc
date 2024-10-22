import { BaseEditor, BaseSelection } from "slate";
import type { ReactEventMap } from "./react";
import { REACT_EVENTS } from "./react";
import { RenderElementProps } from "slate-react";

export declare namespace Object {
  type KeyType = string | number | symbol;
  type Any = Record<KeyType, any>;
  type Never = Record<KeyType, never>;
  type Unknown = Record<KeyType, unknown>;
  type Keys<T extends Record<Object.KeyType, unknown>> = keyof T;
  type Values<T extends Record<Object.KeyType, unknown>> = T[keyof T];
}
export const EDITOR_EVENT = {
  PLUGIN_ACTIVE_CHANGE: "PLUGIN_ACTIVE_CHANGE",
  SELECTION_CHANGE: "SELECTION_CHANGE",
  BASE_EDITOR_CHANGE: "BASE_EDITOR_CHANGE",
  READONLY_CHANGE: "READONLY_CHANGE",
  PLUGIN_COMMANT: "PLUGIN_COMMANT",
  ELEMENT_MOUSE_ENTER: "ELEMENT_MOUSE_ENTER",
  ELEMENT_MOUSE_LEAVE: "ELEMENT_MOUSE_LEAVE",
  HOVER_MENU_ACTIVE: "HOVER_MENU_ACTIVE",
  SELECTED_ELEMENT_CHANGE: "SELECTED_ELEMENT_CHANGE",
  FLOAT_MENU_MOUSE_ENTER: "FLOAT_MENU_MOUSE_ENTER",
  FLOAT_MENU_MOUSE_LEAVE: "FLOAT_MENU_MOUSE_LEAVE",
  ...REACT_EVENTS,
} as const;

export type PluginActiveChangePayload = {
  isActive?: boolean;
  [x: string]: any;
};

export type ElementMouseEventPayload = {
  element: RenderElementProps["element"];
  domElement: HTMLElement;
};

type EditorEventMap = {
  [EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE]: PluginActiveChangePayload;
  [EDITOR_EVENT.SELECTION_CHANGE]: BaseSelection;
  [EDITOR_EVENT.BASE_EDITOR_CHANGE]: BaseEditor;
  [EDITOR_EVENT.READONLY_CHANGE]: boolean;
  [EDITOR_EVENT.PLUGIN_COMMANT]: Record<string, any>;
  [EDITOR_EVENT.ELEMENT_MOUSE_ENTER]: ElementMouseEventPayload;
  [EDITOR_EVENT.ELEMENT_MOUSE_LEAVE]: ElementMouseEventPayload;
  [EDITOR_EVENT.FLOAT_MENU_MOUSE_ENTER]: ElementMouseEventPayload;
  [EDITOR_EVENT.FLOAT_MENU_MOUSE_LEAVE]: undefined;
  [EDITOR_EVENT.HOVER_MENU_ACTIVE]: boolean;
  [EDITOR_EVENT.SELECTED_ELEMENT_CHANGE]: RenderElementProps["element"];
};

export type EventMap = EditorEventMap & ReactEventMap;

export type EventType = Object.Values<typeof EDITOR_EVENT>;
export type Handler<T extends EventType> = {
  once: boolean;
  priority: number;
  listener: Listener<T>;
};
export type Listener<T extends EventType> = (value: EventMap[T]) => void;
export type Listeners = { [T in EventType]?: Handler<T>[] };
