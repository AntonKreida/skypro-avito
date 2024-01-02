import { BrowserRouter } from "react-router-dom";

import "@styles/main.css";

import { AppRouter } from "./router";


export const App = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
  
);
