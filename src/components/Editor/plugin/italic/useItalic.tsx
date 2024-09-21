import { useEffect, useState } from "react";
import { italicPlugin, ITALIC_KEY } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useItalic = () => {
  const [italic, setItalic] = useState<ActiveChangePayload>(
    italicPlugin.status as any
  );

  useEffect(() => {
    italicPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setItalic(payload);
    });
  }, []);

  const commandItalic = () => {
    italicPlugin.onCommand({ italic: ITALIC_KEY });
  };

  return { italic, commandItalic };
};
