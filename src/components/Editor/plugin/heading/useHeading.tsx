import { useEffect, useState } from "react";
import { headingPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { getSelectionAbovePath } from "../../utils";

export const useHeading = () => {
  const [heading, setHeading] = useState<ActiveChangePayload>(
    headingPlugin.getCurrentStatus()
  );

  useEffect(() => {
    headingPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setHeading(payload);
    });
  }, []);

  const commandHeading = ({ heading, at }: any) => {
    if (!at) {
      const editor = headingPlugin.editor;
      at = getSelectionAbovePath(editor);
    }
    headingPlugin.onCommand({ heading, at });
  };

  return { heading, commandHeading };
};
