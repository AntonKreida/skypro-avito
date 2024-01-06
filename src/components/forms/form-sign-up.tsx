import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Logo from "@assets/icon/logo.svg?react";
import { useAppDispatch, useAppSelector } from "@hooks/";
import { postSignUpUser, selectorUser } from "@redux/";
import {
  Button, Input, InputPhone, 
} from "@shared/";

import { TSchemaSignUp, schemaSignUp } from "./schemas";


export const FormSignUp = () => {
  const dispatch = useAppDispatch();
  const { isLoading, errorMessage } = useAppSelector(selectorUser);

  const navigate = useNavigate();
  const {
    control, handleSubmit, formState: { errors } 
  } = useForm<TSchemaSignUp>({
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
    },
    mode: "onTouched",
    resolver: zodResolver(schemaSignUp),
  });

  const [errorsFormSignUp, setErrorsFormSignUp] = useState<string | null>(null);
  
  const handlerOnClickNextLoginIn = () => {
    navigate("/login");
  };

  const handlerOnSubmitForm: SubmitHandler<TSchemaSignUp> = async (data) => {
    const { meta } = await dispatch(postSignUpUser(data));

    if(meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };


  useEffect(() => {
    if (errors.email?.message 
        || errors.password?.message
        || errors.confirm?.message
        || errors.name?.message
        || errors.surname?.message
        || errors.city?.message
        || errors.phone?.message) {
      setErrorsFormSignUp(errors.email?.message 
        || errors.password?.message
        || errors.confirm?.message
        || errors.city?.message
        || errors.name?.message
        || errors.surname?.message
        || errors.city?.message 
        || errors.phone?.message
        || null);
    }
  }, [errors]);

  return (
    <form 
      className="p-12 h-full 
      sm:border border-black/30 flex flex-col gap-14 rounded sm:h-fit sm:max-w-96 w-full"
      onSubmit={  handleSubmit(handlerOnSubmitForm) }
    >
      <div className="flex items-center justify-center">
        <Logo />
      </div>

      <div className="flex flex-col gap-8">
        <Input
          control={ control }
          disabled={ isLoading }
          name="email"
          placeholder="Email"
          type="text"
        />
        <Input
          autoComplete="on"
          control={ control }
          disabled={ isLoading }
          name="password"
          placeholder="Пароль"
          type="password"
        />
        <Input
          autoComplete="on"
          control={ control }
          disabled={ isLoading }
          name="confirm"
          placeholder="Повторите пароль"
          type="password"
        />
        <Input
          control={ control }
          disabled={ isLoading }
          name="name"
          placeholder="Имя (необязательно)"
          type="text"
        />
        <Input
          control={ control }
          disabled={ isLoading }
          name="surname"
          placeholder="Фамилия (необязательно)"
          type="text"
        />
        <InputPhone
          control={ control }
          disabled={ isLoading }
          name="phone"
          placeholder="Телефон (необязательно)"
        />
        <Input
          control={ control }
          disabled={ isLoading }
          name="city"
          placeholder="Город (необязательно)"
          type="text"
        />
      </div>

      { errorsFormSignUp || errorMessage
        ? <p className="text-red-500 text-center">{ errorsFormSignUp || errorMessage }</p>
        : null }

      <div className="flex flex-col gap-5">
        <Button 
          default={ isLoading }
          text="Зарегистрироваться"
          type="submit"
        />
        <Button 
          colors="white"
          default={ isLoading } 
          onClick={ handlerOnClickNextLoginIn } 
          text="Назад"
          type="button" 
        />
      </div>
    </form>
  );
};
