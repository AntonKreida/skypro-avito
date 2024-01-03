import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@hooks/";
import { selectorUser } from "@redux/";


export const ProtectedAuth = () => {
  const { isAuthUser } = useAppSelector(selectorUser);

  if (!isAuthUser) {
    return <Navigate to="/" />;
  }

  return (
    <Outlet />
  );
};
