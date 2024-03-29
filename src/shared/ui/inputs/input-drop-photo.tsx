/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FC, useCallback,
} from "react";
import { useDropzone } from "react-dropzone";
import { Controller, Control, UseFormSetValue } from "react-hook-form";


interface IInputDropPhotoProps {
    control: Control<any>;
    name: string;
    setValue: UseFormSetValue<any>;
    maxFiles: number;
}

export const InputDropPhoto: FC<IInputDropPhotoProps> = ({
  control, name, setValue, maxFiles = 1 
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file, file.name);

    setValue(name, formData, { shouldDirty: true, shouldTouch: true });
  }, [name, setValue]);

  const {
    acceptedFiles, getRootProps, getInputProps, open 
  } = useDropzone({
    onDrop,
    noClick: true,
    maxFiles: maxFiles,
    accept: {
      "image/jpeg": [],
      "image/png": []
    },
  });


  return (
    <Controller
      control={ control }
      name={ name } 
      render={ ({ field: { value } }) => (
        <div className="h-fit">
          <div className="flex flex-col gap-2 items-center justify-start" { ...getRootProps() }>
            <input
              name={ name }
              type="file"
              { ...getInputProps() }
          
            />
            <div className="w-52 h-52 rounded-full overflow-hidden">
              { acceptedFiles.length > 0 || value
                ? (
                  <img 
                    className="w-full h-full object-cover rounded-full"
                    src={ value
                      ? `${import.meta.env.VITE_API_URL}/${value}`
                      : URL.createObjectURL(acceptedFiles[0])   }
                  />
                )
                : ( <div className="w-full h-full bg-slate-200" />) }
            </div>
            <button 
              className="font-roboto text-base font-normal text-blue-custom-def border-none bg-none"
              onClick={ open }
              type="button"
            >
              Заменить
            </button>
          </div>
        </div>
      ) } 
    />
  );
};
