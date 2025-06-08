import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes";

import Providers from "./providers/providers";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <AppRoutes />
      </Providers>
    </BrowserRouter>
  );
}

export default App;
