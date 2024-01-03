import { Routes, Route } from "react-router-dom";

import { ContainerAuth, ContainerMain } from "@layouts/";
import { Login, SignUp, Home } from "@pages/";


export const AppRouter = () => (
  <Routes>
    <Route element={ <ContainerAuth /> }>
      <Route element={ <Login /> } path="/login" />
      <Route element={ <SignUp /> } path="/sign-up" />
    </Route>

    <Route element={ <ContainerMain /> }>
      <Route element={ <Home /> } path="/" />
    </Route>
  </Routes>
);
