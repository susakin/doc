import { useState } from "react";
import { Tooltip, Button } from "./components";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Tooltip content="111111111111111" hasArrow={false} size="small">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </Tooltip>
      <Button>1111</Button>
    </>
  );
}

export default App;
