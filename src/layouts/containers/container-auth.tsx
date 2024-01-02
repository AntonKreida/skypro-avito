import { Outlet } from "react-router-dom";


export const ContainerAuth = () => (
  <div className="flex w-full h-full flex-col items-center justify-center">
    <Outlet />
  </div>
);
