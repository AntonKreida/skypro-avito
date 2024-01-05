import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Logo from "@assets/icon/logo-main.svg?react";
import { Header } from "@components/";
import { Button } from "@shared/";


export const ContainerMain = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handlerOnClickBackHomePage = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <main className="pt-20 w-full px-32 pb-32">
        { location.pathname !== "/" && (
          <div className="flex justify-start gap-14 w-full h-fit py-11 items-center">
            <Logo />
            <Button 
              className="w-fit"
              onClick={ handlerOnClickBackHomePage }
              text="Вернуться на главную" 
              type="button"
            />
          </div>
        ) }
        <Outlet />
      </main>
    </div>
  );
};
