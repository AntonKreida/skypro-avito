import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { IUser } from "@interfaces/";
import { usePatchUpdateUserProfileMutation, usePostLoaderUserAvatarMutation } from "@redux/";
import {
  Button, InputProfile, InputProfilePhone, InputProfilePhoto 
} from "@shared/";

import { TSchemaProfile, schemaProfile } from "./schemas";


interface IFormProfileProps {
    userProfile: IUser;
}

export const FormProfile:FC<IFormProfileProps> = ({ userProfile }) => {
  const [postLoaderAvatarUser] = usePostLoaderUserAvatarMutation();
  const [patchUploadUserProfile] = usePatchUpdateUserProfileMutation();
  const {
    control, handleSubmit, setValue, formState: { errors, isDirty } 
  } = useForm<TSchemaProfile>({
    defaultValues: {
      name: userProfile.name || "",
      phone: userProfile.phone || "",
      city: userProfile.city || "",
      surname: userProfile.surname || "",
      avatar:  userProfile.avatar || "",
    },
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
  
  return (
    <form className="flex flex-col gap-6" onSubmit={ handleSubmit(handlerOnSubmitForm) }>
      <h2 className="text-3xl font-roboto font-medium">Настройка профиля</h2>
      <div className="flex gap-14">
        <InputProfilePhoto control={ control } name="avatar" setValue={ setValue } />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex gap-4 items-center">
              <InputProfile
                control={ control }
                disabled={ false }
                isErrorRequestFrom={ !!errors.name }
                labelTitle="Имя"
                name="name" 
              />
              <InputProfile
                control={ control }
                disabled={ false }
                isErrorRequestFrom={ !!errors.surname }
                labelTitle="Фамилия"
                name="surname" 
              />
            </div>
            <div className="flex gap-4 items-center">
              <InputProfile
                control={ control }
                disabled={ false }
                isErrorRequestFrom={ !!errors.city }
                labelTitle="Город"
                name="city"
              />
            </div>
            <div className="flex gap-4 items-center w-full">
              <InputProfilePhone
                control={ control }
                disabled={ false }
                isErrorRequestFrom={ !!errors.phone }
                labelTitle="Телефон"
                name="phone" 
              />
            </div>
          </div>
          <Button 
            className="w-fit"
            disabled={ !isDirty }
            text="Сохранить"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};
