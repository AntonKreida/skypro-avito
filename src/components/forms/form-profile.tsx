import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { IUser } from "@interfaces/";
import { usePatchUpdateUserProfileMutation, usePostLoaderUserAvatarMutation } from "@redux/";
import {
  Button, InputLabel, InputLabelPhone, InputDropPhoto 
} from "@shared/";


import { TSchemaProfile, schemaProfile } from "./schemas";


interface IFormProfileProps {
    userProfile: IUser;
}

export const FormProfile:FC<IFormProfileProps> = ({ userProfile }) => {
  const [postLoaderAvatarUser, { isLoading: isLoadingAvatar }] = usePostLoaderUserAvatarMutation();
  const [patchUploadUserProfile, { isLoading: isLoadingProfile }] = usePatchUpdateUserProfileMutation();
  const {
    control, handleSubmit, setValue, reset, formState: { errors, isDirty } 
  } = useForm<TSchemaProfile>({
    mode: "onTouched",
    resolver: zodResolver(schemaProfile),
  });

  const handlerOnSubmitForm: SubmitHandler<TSchemaProfile> = async (data) => {
    if(data.avatar && typeof data.avatar !== "string") {
      await postLoaderAvatarUser(data.avatar as FormData);
    }
    delete data.avatar;

    await patchUploadUserProfile(data);
  };

  useEffect(() => {
    if(userProfile) {
      reset({
        ...userProfile,
      });
    }
  }, [userProfile, reset]);
  
  return (
    <form className="flex flex-col gap-6 px-14" onSubmit={ handleSubmit(handlerOnSubmitForm) }>
      <h2 className="text-3xl font-roboto font-medium">Настройка профиля</h2>
      <div className="flex gap-14">
        <InputDropPhoto control={ control } maxFiles={ 1 } name="avatar" setValue={ setValue } />
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-5">
            <div className="flex gap-4 items-center w-full">
              <InputLabel
                control={ control }
                disabled={ isLoadingAvatar || isLoadingProfile }
                isErrorRequestFrom={ !!errors.name }
                labelTitle="Имя"
                name="name" 
              />
              <InputLabel
                control={ control }
                disabled={ isLoadingAvatar || isLoadingProfile }
                isErrorRequestFrom={ !!errors.surname }
                labelTitle="Фамилия"
                name="surname" 
              />
            </div>
            <div className="flex gap-4 items-center">
              <InputLabel
                control={ control }
                disabled={ isLoadingAvatar || isLoadingProfile }
                isErrorRequestFrom={ !!errors.city }
                labelTitle="Город"
                name="city"
              />
            </div>
            <div className="flex gap-4 items-center w-full">
              <InputLabelPhone
                control={ control }
                disabled={ isLoadingAvatar || isLoadingProfile }
                isErrorRequestFrom={ !!errors.phone }
                labelTitle="Телефон"
                name="phone"
              />
            </div>
          </div>
          <Button 
            className="w-fit"
            disabled={ !isDirty || isLoadingAvatar || isLoadingProfile }
            text="Сохранить"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};
