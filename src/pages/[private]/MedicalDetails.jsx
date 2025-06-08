import { useState } from "react";
import { CommonMainContainer } from "../../styles/common";
import { Typography } from "@mui/material";

export default function MedicalDetails() {
  const [count, setCount] = useState(0);

  return (
    <CommonMainContainer>
      <div>
        <Typography variant="h1" fontWeight={700}>
          Detalhes Medicos
        </Typography>

        <a href="https://vite.dev" target="_blank">
          {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
        </a>
        <a href="https://react.dev" target="_blank">
          {/* <img src="https://react.dev/images/og-image.png" className="logo react" alt="React logo" /> */}
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </CommonMainContainer>
  );
}
