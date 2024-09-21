import { useEffect, useState } from "react";
import { Tooltip, Button } from "./components/Editor/components";
import "./App.css";
import BlockMenu from "./components/Editor/components/BlockMenu";
import HeaderTitleMenu from "./components/Editor/components/HeaderTitleMenu";
import HighlightMenu from "./components/Editor/components/HighlightMenu";
import LinkEditPanel from "./components/Editor/components/Link/LinkEditPanel";
import LinkMenu from "./components/Editor/components/Link/LinkMenu";
import MenuTrigger from "./components/Editor/components/MenuTrigger";
// import {
//   Editable,
//   EDITOR_EVENT,
//   useMakeEditor,
// } from "./components/Editor/core";

import Editor from "./components/Editor";

function App() {
  //const [count, setCount] = useState(0);
  // const updateText = () => {
  //   console.log("Text changes", editor.raw.children);
  // };

  // const editor = useMakeEditor();

  // useEffect(() => {
  //   editor.event.on(EDITOR_EVENT.CONTENT_CHANGE, updateText);
  //   return () => {
  //     editor.event.off(EDITOR_EVENT.CONTENT_CHANGE, updateText);
  //   };
  // }, [editor.event, updateText]);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <BlockMenu />
      <HeaderTitleMenu />
      <HighlightMenu />
      <LinkEditPanel />
      <LinkMenu />
      {/* <Editable editor={editor} placeholder="Enter text ..."></Editable> */}
      <MenuTrigger />
      <Editor
        placeholder="1111111111"
        //readOnly
        onChange={(v) => {
          console.log(v);
        }}
      />
    </>
  );
}

export default App;
