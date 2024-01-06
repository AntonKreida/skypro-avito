import { Outlet } from "react-router-dom";


export const ContainerAuth = () => (
  <div className="flex w-screen h-fit flex-col items-center justify-start p-4 xl:p-16">
    <Outlet />
  </div>
);
