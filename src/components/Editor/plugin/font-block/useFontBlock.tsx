import { useEffect, useState } from "react";
import { fontBlockPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useFontBlock = () => {
  const [fontBlock, setFontBlock] = useState<ActiveChangePayload>();

  useEffect(() => {
    fontBlockPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setFontBlock(payload);
    });
  }, []);

  return { fontBlock };
};
