import { useEffect, useState } from "react";
import { todoBlockPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useTodoBlock = () => {
  const [todoBlock, setTodoBlock] = useState<PluginActiveChangePayload>(
    todoBlockPlugin.getCurrentStatus()
  );

  useEffect(() => {
    todoBlockPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setTodoBlock(payload);
    });
  }, []);

  const commandTodoBlock = () => {
    todoBlockPlugin.onCommand(undefined as any);
  };

  const insertNodeAfterSelectedElement = () => {
    todoBlockPlugin.insertNodeAfterSelectedElement(true);
  };

  return { todoBlock, commandTodoBlock, insertNodeAfterSelectedElement };
};
