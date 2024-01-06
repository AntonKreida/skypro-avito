/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import {
  Dispatch, FC, SetStateAction, useCallback, useState 
} from "react";
import { useDropzone } from "react-dropzone";
import { Controller, Control, UseFormSetValue } from "react-hook-form";
import { twMerge } from "tailwind-merge";


type TImages = {
  id: number;
  ad_id: number;
  url: string;
}

interface IInputDropLabelPhotoProps {
    control: Control<any>;
    name: string;
    setValue: UseFormSetValue<any>;
    addStylesLabel?: string
    labelTitle: string;
    subLabelTitle?: string;
    maxFiles: number;
    imagesListDefault?: TImages[];
    setImagesForDelete?: Dispatch<SetStateAction<TImages[]>>;
}

export const InputDropLabelPhoto: FC<IInputDropLabelPhotoProps> = ({
  control, 
  name, 
  setValue, 
  addStylesLabel, 
  labelTitle, 
  subLabelTitle, 
  maxFiles = 5, 
  imagesListDefault,
  setImagesForDelete,
}) => {
  const [listFilesItems, setListFilesItems] = useState<File[]>([]);
  const [imagesDefaultValue, setImagesDefaultValue] = useState<TImages[]>(imagesListDefault || []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const files = acceptedFiles;

    setListFilesItems((prev) => [...prev, ...files]);
    
    const listFormData = files.reduce((acc: FormData[], file) => {
      const formData = new FormData();
      formData.append("file", file, file.name);
      acc.push(formData);
      return acc;
    }, []);

    setValue(name, listFormData, { shouldDirty: true, shouldTouch: true });
  }, [name, setValue]);

  const {
    getInputProps, open 
  } = useDropzone({
    onDrop,
    maxFiles: maxFiles - (imagesDefaultValue
      ? imagesDefaultValue.length + 1
      : 0),
    noClick: true,
    accept: {
      "image/jpeg": [],
      "image/png": []
    }
  });

  const handlerOnClickDeleteFile = (index: number) => {
    setListFilesItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handlerOnClickDeleteDefaultValue = (index: number) => {
    setImagesDefaultValue((prev) => prev?.filter((_, i) => i !== index));
    setImagesForDelete?.((prev) => [...prev, imagesDefaultValue[index]]);
  };

  return (
    <Controller
      control={ control }
      name={ name } 
      render={ () => (
        <div 
          className={ twMerge(classNames(`
          font-roboto text-sm text-gray-400 flex-col flex gap-1 w-full md:text-base`, {
          }, [addStylesLabel])) }
        >
          <div className="flex gap-1">
            <p>
              { labelTitle }
            </p>
            <p className="text-gray-400">
              { subLabelTitle }
            </p>
          </div>

          <input
            name={ name }
            type="file"
            { ...getInputProps() }
          />

          <div className="w-full grid grid-cols-3 gap-2 items-center md:grid-cols-5">
            { imagesDefaultValue?.map((image, index) => (
              <div 
                className="md:max-w-24 flex items-center justify-center md:max-h-24 max-w-full 
                w-full h-full rounded-md overflow-hidden relative group"
                key={ index }
              >
                <img 
                  className="h-24 w-24 md:w-full md:h-full object-cover rounded-md"
                  src={ `${import.meta.env.VITE_API_URL}/${image.url}` }
                />
                <button 
                  className="absolute right-1 top-1 group-hover:block hidden active:scale-[0.8] transition"
                  onClick={ () => handlerOnClickDeleteDefaultValue(index) }
                  type="button"
                >
                  <XMarkIcon className="w-5 h-5 stroke-gray-300" />
                </button>
              </div>
            )) }
            { listFilesItems.map((file, index) => (
              <div 
                className=" 
                w-full h-full flex items-center justify-center rounded-md overflow-hidden relative group"
                key={ index }
              >
                <img 
                  className="h-24 w-24 md:w-full md:h-full object-cover rounded-md"
                  src={ URL.createObjectURL(file) }
                />
                <button 
                  className="absolute right-1 top-1 group-hover:block hidden active:scale-[0.8] transition"
                  onClick={ () => handlerOnClickDeleteFile(index) }
                  type="button"
                >
                  <XMarkIcon className="w-5 h-5 stroke-gray-400" />
                </button>
              </div>
            )) }
            { Array.from({
              length: 5 - listFilesItems.length - (imagesDefaultValue
                ? imagesDefaultValue.length
                : 0)
            }).map((_, index) => (
              <div 
                className="md:max-w-24 md:max-h-24 max-w-full 
                w-full h-full bg-slate-100 flex justify-center rounded-md items-center"
                key={ index }
                onClick={ open }
              >
                <PlusCircleIcon className="h-24 w-24 md:w-full md:h-full stroke-slate-400" />
              </div>
            )) }
          </div>
        </div>

      ) } 
    />
  );
};
