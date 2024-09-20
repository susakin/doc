import { useEffect, useState } from "react";
import { fontLeafPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useFontLeaf = () => {
  const [fontLeaf, setFontLeaf] = useState<ActiveChangePayload>();

  useEffect(() => {
    fontLeafPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setFontLeaf(payload);
    });
  }, []);

  return { fontLeaf };
};
