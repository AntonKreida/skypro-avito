import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Logo from "@assets/icon/logo.svg?react";
import { Button, Input, postSignUp } from "@shared/";

import { TSchemaSignUp, schemaSignUp } from "./schemas";


export const FormSignUp = () => {
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorsLogin, setErrorsLogin] = useState<string | null>(null);
  

  const handlerOnClickNextLoginIn = () => {
    navigate("/login");
  };

  const handlerOnSubmitForm: SubmitHandler<TSchemaSignUp> = async (data) => {
    setErrorsLogin(null);
    setIsLoading(true);

    try{
      setIsLoading(false);
      setErrorsLogin(null);  
      await postSignUp(data);
      navigate("/login");
    } catch {
      setIsLoading(false);

      if(isAxiosError(errors)) {
        setErrorsLogin(errors.message);
        return;
      }

      setErrorsLogin("Неверный логин или пароль");
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
      setErrorsLogin(errors.email?.message 
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
      className="p-12 border border-black/30 flex flex-col gap-14 rounded w-96"
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
          control={ control }
          disabled={ isLoading }
          name="password"
          placeholder="Пароль"
          type="password"
        />
        <Input
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
        <Input
          control={ control }
          disabled={ isLoading }
          name="phone"
          placeholder="Телефон (необязательно)"
          type="text"
        />
        <Input
          control={ control }
          disabled={ isLoading }
          name="city"
          placeholder="Город (необязательно)"
          type="text"
        />
      </div>

      { errorsLogin
        ? <p className="text-red-500 text-center">{ errorsLogin }</p>
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
