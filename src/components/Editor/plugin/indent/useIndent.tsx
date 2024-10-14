import { useEffect, useState } from "react";
import { indentPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { getSelectionAbovePath } from "../../utils";

export const useIndent = () => {
  const [indent, setIndent] = useState<PluginActiveChangePayload>(
    indentPlugin.getCurrentStatus()
  );

  useEffect(() => {
    indentPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setIndent(payload);
    });
  }, []);

  const commandIndent = ({ indent }: any) => {
    indentPlugin.onCommand({ indent });
  };

  return { indent, commandIndent };
};
