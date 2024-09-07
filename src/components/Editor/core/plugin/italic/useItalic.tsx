import { useEffect, useState } from "react";
import { italicPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useItalic = () => {
  const [italicActive, setItalicActive] = useState<ActiveChangePayload>();

  useEffect(() => {
    italicPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setItalicActive(payload);
    });
  }, []);

  return { italicActive };
};
