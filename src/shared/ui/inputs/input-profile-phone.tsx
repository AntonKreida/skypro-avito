/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { FC, useState, FocusEvent } from "react";
import { Controller, Control } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { twMerge } from "tailwind-merge";


interface IInputProfilePhoneProps {
    control: Control<any>;
    name: string;
    labelTitle: string;
    placeholder?: string;
    disabled: boolean;
    isErrorRequestFrom: boolean;
}

export const InputProfilePhone: FC<IInputProfilePhoneProps> = ({ 
  control, 
  name, 
  labelTitle, 
  placeholder, 
  disabled,
  isErrorRequestFrom,
}) => {
  const [onFocus, setOnFocus] = useState(false);

  const handlerFocus = (event: FocusEvent) => {
    event.stopPropagation();
    setOnFocus(false);
  };

  return (
    <Controller
      control={ control }
      name={ name }
      render={ ({
        field: {
          ref, name, onChange, value 
        }, fieldState: { error } 
      }) => (
        <label className={ twMerge(classNames("font-roboto text-base text-gray-400 flex-col flex gap-1 w-full", {
          "text-red-500": error || isErrorRequestFrom,
          "text-gray-300": disabled,
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
            allowEmptyFormatting={ onFocus }
            className={ twMerge(classNames(`
            w-full bg-none font-roboto text-lg text-black
            placeholder:text-gray-custom placeholder:font-roboto
            placeholder:text-lg focus:outline-none border border-black/20 px-5 py-3 rounded-md border-gray-custom 
          disabled:text-gray-custom focus:border-blue-custom-def`, {
              "!border-red-500": error || isErrorRequestFrom,
            })) }
            disabled={ disabled } 
            format="+7 (###)-###-##-##" 
            getInputRef={ ref }
            mask="_"
            name={ name }
            onBlur={ () => setOnFocus(false) }
            onChange={ onChange }
            onFocus={ handlerFocus }
            placeholder={ placeholder }
            value={ value }
          /> 
        </label>
      ) }
    />
  );
};

