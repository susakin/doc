import { useEffect, useState } from "react";
import { dividerBlockPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useDividerBlock = () => {
  const [dividerBlock, setDividerBlock] = useState<ActiveChangePayload>();

  useEffect(() => {
    dividerBlockPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setDividerBlock(payload);
    });
  }, []);

  return { dividerBlock };
};
