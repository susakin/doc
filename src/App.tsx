import { useState } from "react";
import { Tooltip, Button } from "./components";
import "./App.css";
import BlockMenu from "./components/BlockMenu";
import Toolbar from "./components/Toolbar";
import HeaderTitleMenu from "./components/HeaderTitleMenu";
import HighlightMenu from "./components/HighlightMenu";
import LinkEditPanel from "./components/Link/LinkEditPanel";
import LinkMenu from "./components/Link/LinkMenu";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toolbar />
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
    </>
  );
}

export default App;
