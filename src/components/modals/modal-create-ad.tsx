import { XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dispatch, FC, MouseEventHandler, SetStateAction, useEffect 
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import RubIcon from "@assets/icon/rub.svg?react";
import { usePostCreateAdsImageMutation, usePostCreateAdsTextMutation } from "@redux/";
import {
  Button, InputDropLabelPhoto, InputLabel, TextareaLabel 
} from "@shared/";

import { TSchemaCreateEditAd, schemaCreateEditAd } from "./schema/schema-create-edit-ad";


interface IModalCreateAdProps {
    onClickCloseModal: MouseEventHandler<HTMLButtonElement>;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

export const ModalCreateAd: FC<IModalCreateAdProps> = ({ onClickCloseModal, setIsOpenModal }) => {
  const {
    control, setValue, handleSubmit, formState: { errors, isDirty } 
  } = useForm<TSchemaCreateEditAd>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      files: null,
    },
    mode: "onTouched",
    resolver: zodResolver(schemaCreateEditAd),
  });

  const [
    postCreateAsdText, 
    { isLoading: isLoadingText, isSuccess: isSuccessText }
  ] = usePostCreateAdsTextMutation();
  const [
    postCreateAsdImage, 
    { isLoading: isLoadingImage, isSuccess: isSuccessImage }
  ] = usePostCreateAdsImageMutation();

  const handlerOnSubmitForm: SubmitHandler<TSchemaCreateEditAd> = async (data) => {
    const dataForCreateAsd = {
      title: data.title,
      description: data.description,
      price: data.price,
    };

    const newAsd = await postCreateAsdText(dataForCreateAsd).unwrap();

    if(data.files && typeof data.files !== "string" && newAsd) {
      data.files.forEach(async (file) => {
        const dataForAddImage = {
          id: newAsd.id,
          files: file,
        };
    
        await postCreateAsdImage(dataForAddImage);
      });
    }
  };

  
  useEffect(() => {
    if((isSuccessText && isSuccessImage) || isSuccessImage) {
      setIsOpenModal(false);
    }
  }, [isSuccessText, isSuccessImage, setIsOpenModal]);


  return (
    <div 
      className="max-w-[600px] w-full h-fit bg-white rounded-md flex flex-col px-12 py-10 gap-3"
      onClick={ (event) => event.stopPropagation() }
    >
      <div className="flex items-center justify-between">
        <h1 className="md:text-3xl text-xl font-roboto font-medium text-black">
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
          disabled={ isLoadingText || isLoadingImage }
          isErrorRequestFrom={ !!errors.title }
          labelTitle="Название"
          name="title"
          placeholder="Введите название"
        />
        <TextareaLabel
          addStylesLabel="text-black"
          control={ control }
          disabled={ isLoadingText || isLoadingImage }
          isErrorRequestFrom={ !!errors.description }
          labelTitle="Описание"
          name="description"
          placeholder="Введите описание"
        />
        <InputDropLabelPhoto 
          addStylesLabel="text-black" 
          control={ control }
          labelTitle="Фотографии товара"
          maxFiles={ 5 }
          name="files"
          setValue={ setValue }
          subLabelTitle="не более 5"
        />
        <InputLabel
          addStyleInput="pr-9"
          addStylesLabel="text-black w-fit"
          control={ control }
          disabled={ isLoadingText || isLoadingImage }
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
