import { useEffect, useState } from "react";
import { alignPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { getSelectionAbovePath } from "../../utils";

export const useAlign = () => {
  const [align, setAlign] = useState<ActiveChangePayload>(
    alignPlugin.getCurrentStatus()
  );

  useEffect(() => {
    alignPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (align) => {
      setAlign(align);
    });
  }, []);

  const commandAlign = ({ align, at }: any) => {
    if (!at) {
      const editor = alignPlugin.editor;
      at = getSelectionAbovePath(editor);
    }
    alignPlugin.onCommand({ align, at });
  };

  return { align, commandAlign };
};
