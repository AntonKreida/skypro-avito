import { useNavigate, Link } from "react-router-dom";

import Logo from "@assets/icon/logo-head.svg?react";
import { useAppSelector } from "@hooks/";
import { selectorUser } from "@redux/";
import { Button } from "@shared/";


export const Header = () => {
  const { isAuthUser } = useAppSelector(selectorUser);
  const navigate = useNavigate();


  const handlerOnClickLogin = () => {
    navigate("/login");
  };

  const handlerOnClickProfile = () => {
    navigate("/profile");
  };


  return (
    <header className="
    flex items-center justify-between w-full p-5 fixed left-0 top-0 h-20 bg-blue-custom-def rounded-b z-[1000]"
    >
      <Link className="w-fit h-fit" to="/">
        <Logo className="w-32 h-10" />
      </Link>
      { !isAuthUser
        ? (
          <Button 
            className="w-fit" 
            onClick={ handlerOnClickLogin }
            sizeButton="smile"
            text="Войти в личный кабинет"
            type="button"
          />
        )
        : (
          <div className="flex items-center gap-2">
            <Button 
              sizeButton="smile" 
              text="Разместить объявление"
              type="button"
            />
            <Button 
              onClick={ handlerOnClickProfile } 
              sizeButton="smile"
              text="Личный кабинет"
              type="button"
            />
          </div>
        ) }
    </header>
  );
};
