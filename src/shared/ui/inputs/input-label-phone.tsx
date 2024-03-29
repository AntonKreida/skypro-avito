/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { FC, useState } from "react";
import { Controller, Control } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { twMerge } from "tailwind-merge";


interface IInputLabelPhoneProps {
    control: Control<any>;
    name: string;
    labelTitle: string;
    placeholder?: string;
    disabled: boolean;
    isErrorRequestFrom: boolean;
}

export const InputLabelPhone: FC<IInputLabelPhoneProps> = ({ 
  control, 
  name, 
  labelTitle, 
  placeholder, 
  disabled,
  isErrorRequestFrom,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Controller
      control={ control }
      name={ name }
      render={ ({
        field: {
          ref, name, onChange, value 
        }, fieldState: { error } 
      }) => (
        <label className={ twMerge(classNames(`font-roboto 
        text-sm text-gray-400 flex-col flex gap-1 w-full md:text-base`, {
          "text-red-500": error || isErrorRequestFrom,
          "text-gray-300": disabled,
          "!text-blue-custom-def": isFocus,
        })) }
        >
          { !error ? 
            (
              <p>
                { labelTitle }
              </p>
            ):
            (
              <p>
                { error.message }
              </p>
            ) }
          <PatternFormat
            className={ twMerge(classNames(`
            w-full bg-none font-roboto text-sm text-black
            placeholder:text-gray-custom placeholder:font-roboto
            placeholder:text-sm focus:outline-none border border-black/20 px-5 py-3 border-gray-custom 
          disabled:text-gray-custom focus:border-blue-custom-def
          md:text-lg md:placeholder:text-lg rounded-full lg:rounded-md`, {
              "!border-red-500": error || isErrorRequestFrom,
            })) }
            disabled={ disabled } 
            format="+7 (###)-###-##-##" 
            getInputRef={ ref }
            mask="_"
            name={ name }
            onBlur={ () => setIsFocus(false) }
            onChange={ onChange }
            onFocus={ () => setIsFocus(true) }
            placeholder={ placeholder }
            value={ value }
          /> 
        </label>
      ) }
    />
  );
};

