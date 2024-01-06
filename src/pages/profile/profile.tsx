import { FormProfile, SliderProfile } from "@components/";
import { useGetAdsUserQuery, useGetCurrentUserProfileQuery } from "@redux/";
import { Spinner } from "@shared/";


export const Profile = () => {
  const { data: userProfile, isLoading: isLoadingProfile } = useGetCurrentUserProfileQuery(null);
  const { data: adsUser, isLoading: isLoadingAdsUser } = useGetAdsUserQuery(null);

  return  (
    <div>
      { isLoadingProfile || isLoadingAdsUser || !userProfile || !adsUser
        ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Spinner />
          </div>
        )
        : (
          <div className="flex pt-11 pb-14 md:pb-0 lg:pb-0 flex-col gap-10 w-full lg:p-0">
            <h1 className="text-2xl lg:text-4xl font-roboto px-14 font-medium text-black">
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
    </div>
  );
};
