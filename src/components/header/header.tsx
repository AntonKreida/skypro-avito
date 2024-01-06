import { MouseEvent, useState, FC } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { ModalCreateAd } from "@/components/modals/";
import Logo from "@assets/icon/logo-head.svg?react";
import { useAppSelector } from "@hooks/";
import { selectorUser } from "@redux/";
import { Button, Backdrop, InputSearch } from "@shared/";


interface IHeaderProps {
  setValuesAsdForSearch: React.Dispatch<React.SetStateAction<string>>
}


export const Header: FC<IHeaderProps> = ({ setValuesAsdForSearch }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isAuthUser } = useAppSelector(selectorUser);
  const navigate = useNavigate();
  const location = useLocation();

  const handlerOnClickLogin = () => {
    navigate("/login");
  };

  const handlerOnClickProfile = () => {
    navigate("/profile");
  };

  const handlerOnClickOpenModal = () => {
    setIsOpenModal(true);
  };

  const handlerOnClickCloseModal = (event: MouseEvent) => {
    event.stopPropagation();
    setIsOpenModal(false);
  };

  return (
    <header className="
    flex items-center justify-between w-full 
    p-5 fixed left-0 top-0 h-20 
    bg-blue-custom-def rounded-b z-[1000] shadow-md"
    >
      <Link className="w-fit h-fit" to="/">
        <Logo className="w-32 h-10" />
      </Link>
      { !isAuthUser
        ? (
          <Button 
            className="w-fit hidden lg:block" 
            onClick={ handlerOnClickLogin }
            sizeButton="smile"
            text="Войти в личный кабинет"
            type="button"
          />
        )
        : (
          <div className="items-center gap-2 lg:flex hidden">
            <Button 
              onClick={ handlerOnClickOpenModal } 
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
      { location.pathname === "/" && (
        <InputSearch 
          className="block lg:hidden rounded-[30px]"
          onChange={ (event) => setValuesAsdForSearch(event.currentTarget.value) }
          placeholder="Поиск"
        />
      ) }
      { isOpenModal
        ? (
          <Backdrop onClick={ handlerOnClickCloseModal }>
            <ModalCreateAd 
              onClickCloseModal={ handlerOnClickCloseModal }
              setIsOpenModal={ setIsOpenModal }
            />
          </Backdrop>
        )
        : null }
    </header>
  );
};
