import { useEffect, useState } from "react";
import { fontBasePlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useFontBase = () => {
  const [fontBase, setFontBase] = useState<ActiveChangePayload>();

  useEffect(() => {
    fontBasePlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setFontBase(payload);
    });
  }, []);

  return { fontBase };
};
