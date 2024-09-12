import { useEffect, useState } from "react";
import { fontLeafPlugin } from ".";
import { ElementChangePayload, EDITOR_EVENT } from "../../event/action";

export const useFontLeaf = () => {
  const [fontLeaf, setFontLeaf] = useState<ElementChangePayload>();

  useEffect(() => {
    fontLeafPlugin.event.on(EDITOR_EVENT.ELEMENT_CHANGE, (payload) => {
      setFontLeaf(payload);
    });
  }, []);

  return { fontLeaf };
};
