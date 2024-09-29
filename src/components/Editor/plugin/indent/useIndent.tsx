import { useEffect, useState } from "react";
import { indentPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useIndent = () => {
  const [indent, setIndent] = useState<ActiveChangePayload>(
    indentPlugin.getCurrentStatus()
  );

  useEffect(() => {
    indentPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setIndent(payload);
    });
  }, []);

  const commandIndent = (indent: boolean) => {
    indentPlugin.onCommand({ indent });
  };

  return { indent, commandIndent };
};
