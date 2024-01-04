import { XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, MouseEventHandler } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import RubIcon from "@assets/icon/rub.svg?react";
import {
  Button, InputDropLabelPhoto, InputLabel, TextareaLabel 
} from "@shared/";

import { TSchemaCreateAsd, schemaCreateAsd } from "./schema/schema-create-asd";


interface IModalCreateAsdProps {
    onClickCloseModal: MouseEventHandler<HTMLButtonElement>;
}

export const ModalCreateAsd: FC<IModalCreateAsdProps> = ({ onClickCloseModal }) => {
  const {
    control, setValue, handleSubmit, formState: { errors, isDirty } 
  } = useForm<TSchemaCreateAsd>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      files: null,
    },
    mode: "onTouched",
    resolver: zodResolver(schemaCreateAsd),
  });

  const handlerOnSubmitForm: SubmitHandler<TSchemaCreateAsd> = async (data) => {
    console.log(data);
  };

  return (
    <div 
      className="w-[600px] h-[800px] bg-white rounded-md flex flex-col px-12 py-10 gap-3"
      onClick={ (event) => event.stopPropagation() }
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-roboto font-medium text-black">
          Новое объявление
        </h1>
      
        <button 
          className="w-fit h-fit active:scale-[0.8] transition"
          onClick={ onClickCloseModal }
        >
          <XMarkIcon className="w-8 h-8 stroke-black/40" />
        </button>
      </div>
      <form className="w-full h-full flex flex-col gap-5" onSubmit={ handleSubmit(handlerOnSubmitForm) }>
        <InputLabel 
          addStylesLabel="text-black"
          control={ control }
          disabled={ false }
          isErrorRequestFrom={ !!errors.title }
          labelTitle="Название"
          name="title"
          placeholder="Введите название"
        />
        <TextareaLabel
          addStylesLabel="text-black"
          control={ control }
          disabled={ false }
          isErrorRequestFrom={ !!errors.description }
          labelTitle="Описание"
          name="description"
          placeholder="Введите описание"
        />
        <InputDropLabelPhoto 
          addStylesLabel="text-black" 
          control={ control }
          labelTitle="Фотографии товара"
          name="files"
          setValue={ setValue }
          subLabelTitle="не более 5"
        />
        <InputLabel
          addStyleInput="pr-9"
          addStylesLabel="text-black w-fit"
          control={ control }
          disabled={ false }
          icon={ <RubIcon className="w-5 h-5 absolute top-1/2 right-4 -translate-y-1/2" /> }
          isErrorRequestFrom={ !!errors.price }
          labelTitle="Укажите цену"
          name="price"
          type="number"
        />
        <Button 
          className="w-fit"
          disabled={ !isDirty }
          text="Создать"
          type="submit"
        />
      </form>
    </div>
  );
}; 
