import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Logo from "@assets/icon/logo.svg?react";
import { useAppDispatch, useAppSelector } from "@hooks/";
import { selectorUser, postLoginUser } from "@redux/";
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

  const dispatch = useAppDispatch();
  const { isLoading, errorMessage } = useAppSelector(selectorUser);
  

  const handlerOnClickNextSignIn = () => {
    navigate("/sign-up");
  };

  const handlerOnSubmitForm: SubmitHandler<TSchemaLogin> = async (data) => {
    const { meta } = await dispatch(postLoginUser(data));

    if(meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };


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
          autoComplete="on"
          control={ control }
          disabled={ isLoading }
          name="password"
          placeholder="Пароль"
          type="password"
        />
      </div>

      { errors || errorMessage
        ? (
          <p className="text-red-500 text-center">
            { errorMessage 
          || errors.email?.message 
          || errors.password?.message }
          </p>
        )
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
