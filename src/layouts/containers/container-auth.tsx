import { Outlet } from "react-router-dom";


export const ContainerAuth = () => (
  <div className="flex w-screen h-screen flex-col items-center justify-center p-4 xl:justify-start xl:p-16">
    <Outlet />
  </div>
);
