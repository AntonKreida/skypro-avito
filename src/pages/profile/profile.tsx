import { useNavigate } from "react-router-dom";

import Logo from "@assets/icon/logo-main.svg?react";
import { FormProfile, SliderProfile } from "@components/";
import { useGetAdsUserQuery, useGetCurrentUserProfileQuery } from "@redux/";
import { Button, Spinner } from "@shared/";


export const Profile = () => {
  const navigate = useNavigate();
  const { data: userProfile, isLoading: isLoadingProfile } = useGetCurrentUserProfileQuery(null);
  const { data: adsUser, isLoading: isLoadingAdsUser } = useGetAdsUserQuery(null);

  const handlerOnClickBackHomePage = () => {
    navigate("/");
  };

  return  (
    <>
      <div className="flex justify-start gap-14 w-full h-fit py-11 items-center px-14">
        <Logo />
        <Button 
          className="w-fit"
          onClick={ handlerOnClickBackHomePage }
          text="Вернуться на главную" 
          type="button"
        />
      </div>
      { isLoadingProfile || isLoadingAdsUser || !userProfile || !adsUser
        ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Spinner />
          </div>
        )
        : (
          <div className="flex flex-col gap-10 w-full">
            <h1 className="text-4xl font-roboto px-14 font-medium text-black">
              { userProfile?.name
                ? `Здравствуйте ${userProfile.name}!`
                : "Здравствуйте!" }
              { " " }
            </h1>
            <div className="flex flex-col gap-16">
              <FormProfile userProfile={ userProfile } />
              { adsUser.length > 0
                ? <SliderProfile slideList={ adsUser } />
                : null }
            </div>
          </div>
        ) }
    </>
  );
};
