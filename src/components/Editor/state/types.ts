import type { Object } from "../event/bus/action";

export const EDITOR_STATE = {
  IS_MOUSE_DOWN: "IS_MOUSE_DOWN",
  READ_ONLY: "READ_ONLY",
};

export type StateMap = Record<Object.Values<typeof EDITOR_STATE>, boolean>;
export type StateKey = Object.Values<typeof EDITOR_STATE>;
