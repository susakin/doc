import { useEffect, useState } from "react";
import { highlightBlockPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { Editor, Node } from "slate";

export const useHighlightBlock = () => {
  const [highlightBlock, setHighlightBlock] = useState<ActiveChangePayload>(
    highlightBlockPlugin.getCurrentStatus()
  );

  useEffect(() => {
    highlightBlockPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setHighlightBlock(payload);
    });
  }, []);

  const commandHighlightBlock = ({ highlightBlock, at }: any) => {
    if (!at) {
      const editor = highlightBlockPlugin.editor;
      if (editor) {
        const selection = editor.selection;
        if (selection) {
          const match = Editor.above(editor, {
            at: selection,
            match: (n) => Editor.isBlock(editor, n as any),
          });

          if (match) {
            // 找到了第一个父级 block 节点的路径
            at = match[1];
          }
        }
      }
    }
    highlightBlockPlugin.onCommand({
      highlightBlock,
      at,
    });
  };

  return { highlightBlock, commandHighlightBlock };
};
