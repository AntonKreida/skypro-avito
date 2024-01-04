import { Outlet } from "react-router-dom";

import { Header } from "@components/";


export const ContainerMain = () => (
  <div className="flex flex-col w-screen h-screen">
    <Header />
    <main className="pt-20 w-full px-32 pb-20">
      <Outlet />
    </main>
  </div>
);
