import type { BaseNode, Editor } from "../delta";
import type { HistoryEditor } from "../delta";
import type { ReactEditor } from "../delta";

export type EditorRaw = Editor & HistoryEditor & ReactEditor;

export type EditorOptions = {
  init?: BaseNode[];
  history: boolean;
};
