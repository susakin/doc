import { BaseEditor } from "slate";
import { DIVIDER_BLOCK_KEY } from "../divider-block";

export const withSchema = (editor: BaseEditor): BaseEditor => {
  const { isVoid } = editor;
  const voidKey = [DIVIDER_BLOCK_KEY];
  editor.isVoid = (element) => {
    for (const key of Object.keys(element)) {
      if (voidKey.includes(key)) return true;
    }

    return isVoid(element);
  };
  return editor;
};
