/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, Control, UseFormSetValue } from "react-hook-form";
import { twMerge } from "tailwind-merge";


interface IInputDropLabelPhotoProps {
    control: Control<any>;
    name: string;
    setValue: UseFormSetValue<any>;
    addStylesLabel?: string
    labelTitle: string;
    subLabelTitle?: string;
}

export const InputDropLabelPhoto: FC<IInputDropLabelPhotoProps> = ({
  control, name, setValue, addStylesLabel, labelTitle, subLabelTitle, 
}) => {
  const [listFilesItems, setListFilesItems] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const files = acceptedFiles.slice(0, 5 - listFilesItems.length);
    const formData = new FormData();

    setListFilesItems((prev) => [...prev, ...files]);
    
    files.forEach((file) => formData.append("file", file, file.name));

    setValue(name, formData, { shouldDirty: true, shouldTouch: true });
  }, [listFilesItems.length, name, setValue]);

  const {
    getInputProps, open 
  } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "image/jpeg": [],
      "image/png": []
    }
  });

  const handlerOnClickOnDeleteFile = (index: number) => {
    setListFilesItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Controller
      control={ control }
      name={ name } 
      render={ () => (
        <div 
          className={ twMerge(classNames("font-roboto text-base text-gray-400 flex-col flex gap-1 w-full ", {
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

          <div className="w-full flex gap-2">
            { listFilesItems.map((file, index) => (
              <div 
                className="w-24 h-24 rounded-md overflow-hidden relative group"
                key={ index }
              >
                <img 
                  className="w-full h-full object-cover rounded-md"
                  src={ URL.createObjectURL(file) }
                />
                <button 
                  className="absolute right-1 top-1 group-hover:block hidden active:scale-[0.8] transition"
                  onClick={ () => handlerOnClickOnDeleteFile(index) }
                  type="button"
                >
                  <XMarkIcon className="w-5 h-5 stroke-black-400 " />
                </button>
              </div>
            )) }
            { Array.from({ length: 5 - listFilesItems.length }).map((_, index) => (
              <div 
                className="w-24 h-24 bg-slate-100 flex justify-center rounded-md items-center"
                key={ index }
                onClick={ open }
              >
                <PlusCircleIcon className="w-10 h-10 stroke-slate-400" />
              </div>
            )) }
          </div>
        </div>

      ) } 
    />
  );
};
