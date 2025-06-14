import {
  BaseEditor,
  Editor,
  Transforms,
  Node,
  Element as SlateElement,
} from "slate";
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
            //[TEXT_BLOCK_KEY]: true,
          },
          { at: path.concat(1) }
        );
      }

      for (const [, childPath] of Node.children(editor, path)) {
        const slateIndex = childPath[0];

        switch (slateIndex) {
          case 0:
            Transforms.setNodes<SlateElement>(
              editor,
              {
                [HEADER_TITLE_KEY]: true,
                children: [{ text: "" }],
              },
              {
                at: childPath,
              }
            );
            break;
          case 1:
            Transforms.setNodes<SlateElement>(
              editor,
              {
                children: [{ text: "" }],
                placeholder: "请输入",
                holdingPlaceholder: true,
                //[TEXT_BLOCK_KEY]: true,
              },
              {
                at: childPath,
              }
            );
          default:
            break;
        }
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};
