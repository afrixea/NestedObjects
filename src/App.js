import "./styles.css";
import React, { useState } from "react";

import Method2 from "./Method_2";
import Method1 from "./Method_1";

const App = () => {
  const [method, setMethod] = useState("0");
  return (
    <>
      <button
        onClick={() => {
          setMethod("1");
        }}
      >
        method1
      </button>
      <button
        onClick={() => {
          setMethod("2");
        }}
      >
        method2
      </button>
      {method === "1" ? <Method1 /> : null}
      {method === "2" ? <Method2 /> : null}
    </>
  );
};
export default App;
