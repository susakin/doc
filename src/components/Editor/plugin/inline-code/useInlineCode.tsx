import { useLayoutEffect, useState } from "react";
import { inlineCodePlugin, INLINE_CODE_KEY } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useInlineCode = () => {
  const [inlineCode, setInlineCode] = useState<PluginActiveChangePayload>(
    inlineCodePlugin.getCurrentStatus()
  );
  useLayoutEffect(() => {
    inlineCodePlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setInlineCode(payload);
    });
  }, []);

  const commandInlineCode = () => {
    inlineCodePlugin.onCommand({ inlineCode: INLINE_CODE_KEY });
  };

  return { inlineCode, commandInlineCode };
};
