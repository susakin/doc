import { useEffect, useState } from "react";
import { Tooltip, Button } from "./components";
import "./App.css";
import BlockMenu from "./components/BlockMenu";
import Toolbar from "./components/Toolbar";
import HeaderTitleMenu from "./components/HeaderTitleMenu";
import HighlightMenu from "./components/HighlightMenu";
import LinkEditPanel from "./components/Link/LinkEditPanel";
import LinkMenu from "./components/Link/LinkMenu";
import MenuTrigger from "./components/MenuTrigger";
import {
  Editable,
  EDITOR_EVENT,
  useMakeEditor,
} from "./components/Editor/core";

function App() {
  const [count, setCount] = useState(0);
  const updateText = () => {
    console.log("Text changes", editor.raw.children);
  };

  const editor = useMakeEditor();

  useEffect(() => {
    editor.event.on(EDITOR_EVENT.CONTENT_CHANGE, updateText);
    return () => {
      editor.event.off(EDITOR_EVENT.CONTENT_CHANGE, updateText);
    };
  }, [editor.event, updateText]);
  return (
    <>
      <Tooltip content="111111111111111" size="small" placement="left">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </Tooltip>
      <BlockMenu />
      <HeaderTitleMenu />
      <HighlightMenu />
      <LinkEditPanel />
      <LinkMenu />
      <Editable editor={editor} placeholder="Enter text ..."></Editable>
      <Toolbar />
      <MenuTrigger />
    </>
  );
}

export default App;
