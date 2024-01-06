import { LockOpenIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import Home from "@assets/icon/home.svg?react";
import Plus from "@assets/icon/plus.svg?react";
import User from "@assets/icon/user.svg?react";
import { useAppSelector } from "@hooks/";
import { selectorUser } from "@redux/";


export const Footer = () => {
  const { isAuthUser } = useAppSelector(selectorUser);
  

  return (
    <footer 
      className="w-full h-20 bg-white 
          shadow-2xl justify-around items-center fixed bottom-0 
          left-0 z-[1000] flex px-14 py-2 lg:hidden rounded-md"
    >
      <Link to="/">
        <Home className="w-10 h-10" />
      </Link>
      { !!isAuthUser && <Plus className="w-10 h-10" /> }
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
    </footer>
  );
};
