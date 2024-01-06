import { LockOpenIcon } from "@heroicons/react/24/outline";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";

import { ModalCreateAd } from "@/components/modals";
import Home from "@assets/icon/home.svg?react";
import Plus from "@assets/icon/plus.svg?react";
import User from "@assets/icon/user.svg?react";
import { useAppSelector } from "@hooks/";
import { selectorUser } from "@redux/";
import { Backdrop } from "@shared/";


export const Footer = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isAuthUser } = useAppSelector(selectorUser);

  const handlerOnClickOpenModal = () => {
    setIsOpenModal(true);
  };

  const handlerOnClickCloseModal = (event: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    event.stopPropagation();
    setIsOpenModal(false);
  };
  

  return (
    <footer 
      className="w-full h-20 bg-white 
          shadow-2xl justify-around items-center fixed bottom-0 
          left-0 z-[1000] flex px-14 py-2 lg:hidden rounded-md"
    >
      <Link to="/">
        <Home className="w-10 h-10" />
      </Link>
      { !!isAuthUser && <Plus className="w-10 h-10" onClick={ handlerOnClickOpenModal } /> }
      { !!isAuthUser
        && (
          <Link to="/profile">
            <User className="w-10 h-10" />
          </Link>
        ) }
      { !isAuthUser && (
        <Link to="/login">
          <LockOpenIcon className="w-10 h-10 stroke-blue-custom-def" />
        </Link>
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
    </footer>
  );
};
