import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import "@styles/main.css";

import { store, persistor } from "./redux";
import { AppRouter } from "./router";


export const App = () => (
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={ persistor } />
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </Provider>
  
);
