import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Logo from "@assets/icon/logo-main.svg?react";
import { Header, Footer } from "@components/";
import { Button } from "@shared/";


export const ContainerMain = () => {
  const [valuesAsdForSearch, setValuesAsdForSearch] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  const handlerOnClickBackHomePage = () => {
    navigate("/");
  };

  return (
    <div className="
    flex flex-col w-screen h-fit overflow-x-hidden"
    >
      <Header setValuesAsdForSearch={ setValuesAsdForSearch } />
      <main className="pt-20 w-full h-fit px-5 pb-10 md:px-32 md:pb-32 overflow-x-hidden">
        { location.pathname !== "/" && (
          <div className="hidden justify-start gap-14 w-full h-fit py-11 items-center lg:flex">
            <Logo />
            <Button 
              className="w-fit"
              onClick={ handlerOnClickBackHomePage }
              text="Вернуться на главную" 
              type="button"
            />
          </div>
        ) }
        <Outlet context={{ valuesAsdForSearch }} />
        <Footer />
      </main>
    </div>
  );
};
