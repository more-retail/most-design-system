import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import tokens from "../tokens/dist/js/tokens.js";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>most design system</h1>
    </>
  );
}

export default { App, tokens };
