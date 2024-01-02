import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Logo from "@assets/icon/logo.svg?react";
import { Button, Input } from "@shared/";

import { TSchemaLogin, schemaLogin } from "./schemas";


export const FormLogin = () => {
  const navigate = useNavigate();
  const {
    control, handleSubmit, formState: { errors } 
  } = useForm<TSchemaLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: zodResolver(schemaLogin),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorsLogin, setErrorsLogin] = useState<string | null>(null);
  

  const handlerOnClickNextSignIn = () => {
    navigate("/sign-up");
  };

  const handlerOnSubmitForm: SubmitHandler<TSchemaLogin> = async (data) => {
    setErrorsLogin(null);
    setIsLoading(true);

    try{
      setIsLoading(false);
      setErrorsLogin(null);  
      await schemaLogin.parseAsync(data);
      navigate("/");
    } catch {
      setIsLoading(false);
      setErrorsLogin("Неверный логин или пароль");
    }
  };


  useEffect(() => {
    if (errors.email?.message || errors.password?.message) {
      setErrorsLogin(errors.email?.message || errors.password?.message || null);
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
      </div>

      { errorsLogin
        ? <p className="text-red-500 text-center">{ errorsLogin }</p>
        : null }

      <div className="flex flex-col gap-5">
        <Button 
          default={ isLoading }
          text="Войти"
          type="submit"
        />
        <Button 
          colors="white"
          default={ isLoading } 
          onClick={ handlerOnClickNextSignIn } 
          text="Зарегистрироваться"
          type="button" 
        />
      </div>
    </form>
  );
};
