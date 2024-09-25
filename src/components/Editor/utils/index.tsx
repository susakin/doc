import {
  BaseEditor,
  BaseRange,
  Editor,
  Element as SlateElement,
  Range,
  Text,
} from "slate";

export const getAttributeAtCursor = (
  editor: BaseEditor | undefined,
  attribute: string
) => {
  if (!editor) return null;
  const { selection } = editor;
  if (!selection) return null;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && !!n[attribute],
    })
  );

  console.log(match, "match");

  return ((match?.[0] || {}) as any)[attribute];
};

export const isBlockActive = (
  editor: BaseEditor,
  attribute: string,
  value: any
) => {
  if (!editor) return false;
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[attribute] === value,
    })
  );

  return !!match;
};

export const isMarkActive = (editor: BaseEditor, format: string) => {
  try {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  } catch (e) {
    return false;
  }
};

export const getMarkByFormat = (editor: BaseEditor, format: string) => {
  try {
    const marks = Editor.marks(editor);
    return marks?.[format];
  } catch (e) {
    return null;
  }
};

export const isObject = (value: unknown): value is Record<any, any> =>
  value !== null && typeof value === "object";
export const isFunction = (value: unknown): value is (...args: any) => any =>
  typeof value === "function";

export const isString = (value: unknown): value is string =>
  typeof value === "string";
export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";
export const isNumber = (value: unknown): value is number =>
  typeof value === "number";
export const isUndef = (value: unknown): value is undefined =>
  typeof value === "undefined";

export const isCollapsed = (
  editor: BaseEditor,
  at = editor.selection
): at is BaseRange => {
  return !at || Range.isCollapsed(at);
};

export const isText = (node: Node) => Text.isText(node);
