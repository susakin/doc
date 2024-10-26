import { BaseEditor, Editor, Transforms } from "slate";
import { HEADER_TITLE_KEY } from "../header-title-block";

export const withLayout = (editor: BaseEditor): BaseEditor => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      if (editor.children.length <= 1 && Editor.string(editor, [0, 0]) === "") {
        Transforms.insertNodes(
          editor,
          {
            [HEADER_TITLE_KEY]: true,
            children: [{ text: "" }],
          },
          {
            at: path.concat(0),
            select: true,
          }
        );
      }

      if (editor.children.length < 2) {
        Transforms.insertNodes(
          editor,
          {
            children: [{ text: "" }],
            placeholder: "请输入",
            holdingPlaceholder: true,
          },
          { at: path.concat(1) }
        );
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};
