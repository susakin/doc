import { useEffect, useState } from "react";
import { italicPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useItalic = () => {
  const [italic, setItalic] = useState<ActiveChangePayload>();

  useEffect(() => {
    italicPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setItalic(payload);
    });
  }, []);

  return { italic };
};
