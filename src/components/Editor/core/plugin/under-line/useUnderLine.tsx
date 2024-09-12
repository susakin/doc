import { useEffect, useState } from "react";
import { underLinePlugin } from ".";
import { ElementChangePayload, EDITOR_EVENT } from "../../event/action";

export const useItalic = () => {
  const [italic, setItalic] = useState<ElementChangePayload>();

  useEffect(() => {
    underLinePlugin.event.on(EDITOR_EVENT.ELEMENT_CHANGE, (payload) => {
      setItalic(payload);
    });
  }, []);

  return { italic };
};
