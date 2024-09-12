import { useEffect, useState } from "react";
import { alignPlugin } from ".";
import { ElementChangePayload, EDITOR_EVENT } from "../../event/action";

export const useAlign = () => {
  const [align, setAlign] = useState<ElementChangePayload>();

  useEffect(() => {
    alignPlugin.event.on(EDITOR_EVENT.ELEMENT_CHANGE, (payload) => {
      setAlign(payload);
    });
  }, []);

  return { align };
};
