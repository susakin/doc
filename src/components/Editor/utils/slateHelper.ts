import { BaseEditor, BaseRange, Editor, Range, Text } from "slate";

export const isMarkActive = (editor: BaseEditor, format: string) => {
  try {
    const marks = Editor.marks(editor);
    return marks ? (marks as any)[format] === true : false;
  } catch (e) {
    return false;
  }
};

export const getMarkByFormat = (editor: BaseEditor, format: string) => {
  try {
    const marks = Editor.marks(editor);
    return (marks as any)?.[format];
  } catch (e) {
    return null;
  }
};

export const isCollapsed = (
  editor: BaseEditor,
  at = editor.selection
): at is BaseRange => {
  return !at || Range.isCollapsed(at);
};

export const isText = ((node: Node) => Text.isText(node)) as any;

export const getSelectionAboveNode = (editor: BaseEditor | undefined) => {
  let node: any;
  if (editor) {
    const selection = editor.selection;
    if (selection) {
      const match = Editor.above(editor, {
        at: selection,
        match: (n) => Editor.isBlock(editor, n as any),
      });

      if (match) {
        // 找到了第一个父级 block 节点的路径
        node = match[0];
      }
    }
  }
  return node;
};
