import { Routes, Route } from "react-router-dom";

import { ContainerAuth } from "@layouts/";
import { Login } from "@pages/";


export const AppRouter = () => (
  <Routes>
    <Route element={ <ContainerAuth /> }>
      <Route element={ <Login /> } path="/login" />
    </Route>
  </Routes>
);
