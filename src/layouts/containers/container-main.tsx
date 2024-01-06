import classNames from "classnames";
import { useState } from "react";
import {
  Outlet, useNavigate, useLocation, useParams 
} from "react-router-dom";

import Logo from "@assets/icon/logo-main.svg?react";
import { Header, Footer } from "@components/";
import { Button } from "@shared/";


export const ContainerMain = () => {
  const [valuesAsdForSearch, setValuesAsdForSearch] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const handlerOnClickBackHomePage = () => {
    navigate("/");
  };

  return (
    <div className="
    flex flex-col w-screen h-fit overflow-x-hidden"
    >
      <Header setValuesAsdForSearch={ setValuesAsdForSearch } />
      <main 
        className={ classNames("pt-32 w-full h-fit px-5 lg:px-32 pb-12 lg:pt-20 overflow-x-hidden", {
          "px-0": params?.idAd && !params?.idSalesman,
          "pt-10": params?.idAd && !params?.idSalesman
        }) }
      >
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
