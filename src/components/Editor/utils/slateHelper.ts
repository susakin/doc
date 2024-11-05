import {
  BaseEditor,
  BaseRange,
  Editor,
  Range,
  Text,
  type Path,
  Location,
  Node,
  Point,
} from "slate";

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

export const getPreviousPath = (path: Path): Path | undefined => {
  if (path.length === 0) return;

  const last = path.at(-1)!;

  if (last <= 0) return;

  return path.slice(0, -1).concat(last - 1);
};

export const isMatchedEvent = (
  event: React.KeyboardEvent<HTMLDivElement>,
  ...args: string[]
) => {
  const key = event.key;
  return args.indexOf(key) > -1;
};

export const isPreviousEmpty = (editor: BaseEditor, path: Path) => {
  const previoutPath = getPreviousPath(path);
  const text = Editor.string(editor, previoutPath as any);

  return text?.length === 0;
};

/**
 * 向上查找最近的`Block`节点
 * @param editor
 * @param at
 */
export const getClosestBlockNode = (
  editor: Editor,
  at: Location
): Node | null => {
  const path = [...Editor.path(editor, at)];
  while (path.length) {
    const tuple = Editor.node(editor, path);
    if (tuple && Editor.isBlock(editor, tuple[0] as any)) return tuple[0];
    path.pop();
  }
  return null;
};

export const getParentNodeByKey = (
  editor: Editor,
  at: Location,
  key: string
): Node | null => {
  const path = [...Editor.path(editor, at)];
  while (path.length) {
    const tuple = Editor.node(editor, path);
    if (
      tuple &&
      Editor.isBlock(editor, tuple[0] as any) &&
      typeof (tuple[0] as any)?.[key] !== "undefined"
    )
      return tuple[0];
    path.pop();
  }
  return null;
};

export const isFocusLineStart = (editor: Editor, path: Path) => {
  const start = Editor.start(editor, path);
  return (
    isCollapsed(editor, editor.selection) &&
    Point.equals(start, editor.selection.anchor)
  );
};
