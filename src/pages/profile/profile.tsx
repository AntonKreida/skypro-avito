import { useNavigate } from "react-router-dom";

import Logo from "@assets/icon/logo-main.svg?react";
import { FormProfile } from "@components/";
import { useGetCurrentUserProfileQuery } from "@redux/";
import { Button, Spinner } from "@shared/";


export const Profile = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCurrentUserProfileQuery(null);

  const handlerOnClickBackHomePage = () => {
    navigate("/");
  };

  return  (
    <>
      <div className="flex justify-start gap-14 w-full h-fit py-11 items-center">
        <Logo />
        <Button 
          className="w-fit"
          disabled={ isLoading }
          onClick={ handlerOnClickBackHomePage }
          text="Вернуться на главную" 
          type="button"
        />
      </div>
      { isLoading || !data
        ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Spinner />
          </div>
        )
        : (
          <div className="flex flex-col gap-10 w-full">
            <h1 className="text-4xl font-roboto font-medium text-black">
              { data?.name
                ? `Здравствуйте ${data.name}!`
                : "Здравствуйте!" }
              { " " }
            </h1>
            <FormProfile userProfile={ data } />
          </div>
        ) }
    </>
  );
};
