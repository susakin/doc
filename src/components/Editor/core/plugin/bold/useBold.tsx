import { useEffect, useState } from "react";
import { boldPlugin } from ".";
import { ElementChangePayload, EDITOR_EVENT } from "../../event/action";

export const useBold = () => {
  const [bold, setBold] = useState<ElementChangePayload>();

  useEffect(() => {
    boldPlugin.event.on(EDITOR_EVENT.ELEMENT_CHANGE, (payload) => {
      setBold(payload);
    });
  }, []);

  return { bold };
};
