import { Routes, Route } from "react-router-dom";

import { ProtectedAuth } from "@hocs/";
import { ContainerAuth, ContainerMain } from "@layouts/";
import {
  Login, 
  SignUp, 
  Home, 
  Profile, 
  Ad, 
  Salesman,
} from "@pages/";


export const AppRouter = () => (
  <Routes>
    <Route element={ <ContainerAuth /> }>
      <Route element={ <Login /> } path="/login" />
      <Route element={ <SignUp /> } path="/sign-up" />
    </Route>

    <Route element={ <ContainerMain /> }>
      <Route element={ <Home /> } path="/" />
      <Route element={ <ProtectedAuth /> }>
        <Route element={ <Profile /> } path="/profile" />
      </Route>
      <Route element={ <Ad /> } path="/:idAd" />
      <Route element={ <Salesman /> } path="/:idAd/:idSalesman" />
    </Route>
  </Routes>
);
