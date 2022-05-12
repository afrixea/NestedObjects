import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import Method_2 from "./Method_2";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    {/* <App /> */}
    <Method_2 />
  </StrictMode>
);
