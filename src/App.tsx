import { useState } from "react";
import { Tooltip, Button } from "./components";
import "./App.css";
import BlockMenu from "./components/BlockMenu";
import Toolbar from "./components/Toolbar";

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
    </>
  );
}

export default App;
