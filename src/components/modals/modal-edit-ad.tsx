import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dispatch, FC, MouseEventHandler, SetStateAction, useEffect , useState
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import RubIcon from "@assets/icon/rub.svg?react";
import { IAsd } from "@interfaces/";
import {
  useDeleteImagesAdMutation, usePatchCurrentAdMutation, usePostCreateAdsImageMutation 
} from "@redux/";
import {
  Button, InputDropLabelPhoto, InputLabel, TextareaLabel 
} from "@shared/";

import { TSchemaCreateEditAd, schemaCreateEditAd } from "./schema/schema-create-edit-ad";


type TImages = {
    id: number;
    ad_id: number;
    url: string;
  }

interface IModalEditAdProps {
    onClickCloseModal: MouseEventHandler<HTMLButtonElement>;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
    dataAd: IAsd
}

export const ModalEditAd: FC<IModalEditAdProps> = ({ onClickCloseModal, setIsOpenModal, dataAd }) => {
  const [imagesForDelete, setImagesForDelete] = useState<TImages[]>([]);
  const [patchCurrentAd, 
    { isLoading: isLoadingAd, isSuccess: isSuccessAd }] 
    = usePatchCurrentAdMutation();
  const [deleteImagesCurrentAd, 
    { isLoading: isLoadingDelete, isSuccess: isSuccessDelete }] 
    = useDeleteImagesAdMutation();


  const {
    control, setValue, handleSubmit, formState: { errors } 
  } = useForm<TSchemaCreateEditAd>({
    defaultValues: {
      title: dataAd.title || "",
      description: dataAd.description || "",
      price: dataAd.price || 0,
      files: null,
    },
    mode: "onTouched",
    resolver: zodResolver(schemaCreateEditAd),
  });

  const [
    postCreateAsdImage, 
    { isLoading: isLoadingImage, isSuccess: isSuccessImage }
  ] = usePostCreateAdsImageMutation();

  const handlerOnSubmitForm: SubmitHandler<TSchemaCreateEditAd> = async (data) => {
    const dataForEditAsd = {
      id: dataAd.id,
      title: data.title,
      description: data.description,
      price: data.price,
    };

    if(imagesForDelete.length) {
      imagesForDelete.forEach  ( (async (image) => {
        const dataForDelete = {
          idAd: dataAd.id,
          imgUrl: image.url
        };
        await deleteImagesCurrentAd(dataForDelete);
      }));
    }

    const updateAd = await patchCurrentAd(dataForEditAsd).unwrap();

    if(data.files && typeof data.files !== "string" && updateAd) {
      data.files.forEach(async (file) => {
        const dataForAddImage = {
          id: updateAd.id,
          files: file,
        };
    
        await postCreateAsdImage(dataForAddImage);
      });
    }
  };

  
  useEffect(() => {
    if(isSuccessImage || isSuccessAd || isSuccessDelete) {
      setIsOpenModal(false);
    }
  }, [isSuccessAd, isSuccessDelete, isSuccessImage, setIsOpenModal]);

  return (
    <div 
      className="h-full relative w-full lg:w-[600px] lg:h-[800px] bg-white rounded-md flex flex-col px-12 py-10 gap-3"
      onClick={ (event) => event.stopPropagation() }
    >
      <div className="flex items-center justify-center lg:justify-between">
        <h1 className="md:text-3xl text-xl font-roboto font-medium text-black">
          Новое объявление
        </h1>
      
        <button 
          className="w-fit h-fit active:scale-[0.8] transition hidden lg:block"
          onClick={ onClickCloseModal }
        >
          <XMarkIcon className="w-8 h-8 stroke-black/40" />
        </button>
      </div>
      <form className="w-full h-full flex flex-col gap-5" onSubmit={ handleSubmit(handlerOnSubmitForm) }>
        <InputLabel 
          addStylesLabel="text-black"
          control={ control }
          disabled={ isLoadingAd || isLoadingImage || isLoadingDelete }
          isErrorRequestFrom={ !!errors.title }
          labelTitle="Название"
          name="title"
          placeholder="Введите название"
        />
        <TextareaLabel
          addStylesLabel="text-black"
          control={ control }
          disabled={ isLoadingAd || isLoadingImage || isLoadingDelete }
          isErrorRequestFrom={ !!errors.description }
          labelTitle="Описание"
          name="description"
          placeholder="Введите описание"
        />
        <InputDropLabelPhoto 
          addStylesLabel="text-black" 
          control={ control }
          imagesListDefault={ dataAd.images }
          labelTitle="Фотографии товара"
          maxFiles={ 5 }
          name="files"
          setImagesForDelete={ setImagesForDelete }
          setValue={ setValue }
          subLabelTitle="не более 5"
        />
        <InputLabel
          addStyleInput="pr-9"
          addStylesLabel="text-black lg:w-fit w-full"
          control={ control }
          disabled={ isLoadingAd || isLoadingImage || isLoadingDelete }
          icon={ <RubIcon className="w-5 h-5 absolute top-1/2 right-4 -translate-y-1/2" /> }
          isErrorRequestFrom={ !!errors.price }
          labelTitle="Укажите цену"
          name="price"
          type="number"
        />
        <Button 
          className="lg:w-fit w-full"
          text="Создать"
          type="submit"
        />
      </form>
      <button 
        className="w-fit h-fit absolute left-8 top-10 z-[900] block lg:hidden"
        onClick={ onClickCloseModal }
      >
        <ChevronLeftIcon 
          className="w-8 h-8 text-white stroke-black "
          
        />
      </button>
    </div>
  );
}; 
