import { useState } from "react";
import { Tooltip, Button } from "./components";
import "./App.css";
import ColorPicker from "./components/ColortPicker";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Tooltip content="111111111111111" size="small" placement="left">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </Tooltip>
      <ColorPicker>
        <Button>1111</Button>
      </ColorPicker>
    </>
  );
}

export default App;
