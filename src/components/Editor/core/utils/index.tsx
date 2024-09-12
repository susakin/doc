import { BaseEditor, Editor, Element as SlateElement, Node } from "slate";

export const isBlockActive = (
  editor?: BaseEditor,
  format?: string,
  blockType: string = "type"
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
        n[blockType] === format,
    })
  );

  return !!match;
};

export const isMarkActive = (editor: BaseEditor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export function getAttributeAtCursor(
  editor: BaseEditor | undefined,
  attributeKey: string
) {
  if (!editor) return null;
  // 获取当前选区
  const selection = editor.selection;
  // 如果没有选区，返回 null
  if (!selection) {
    return null;
  }
  // 获取选区所在的节点
  const [nodeEntry] = Editor.nodes(editor, {
    at: selection,
    match: (n) => !Editor.isEditor(n),
  });

  if (nodeEntry) {
    const [node] = nodeEntry;
    console.log(node, "node");
    if (SlateElement.isElement(node)) {
      // 如果是元素节点，返回元素节点的属性
      return node[attributeKey] || null;
    }
  }

  return null;
}

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
