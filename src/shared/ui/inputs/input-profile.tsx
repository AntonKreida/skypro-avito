/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { FC, useState } from "react";
import { Controller, Control } from "react-hook-form";
import { twMerge } from "tailwind-merge";


interface IInputProfileProps {
    control: Control<any>;
    name: string;
    labelTitle: string;
    placeholder?: string;
    disabled: boolean;
    isErrorRequestFrom: boolean;
    addStylesLabel?: string;
}

export const InputProfile: FC<IInputProfileProps> = ({ 
  control, 
  name, 
  labelTitle, 
  placeholder, 
  disabled,
  isErrorRequestFrom,
  addStylesLabel,
}) => {
  const [isFocus, setIsFocus] = useState(false);


  return (
    <Controller
      control={ control }
      name={ name }
      render={ ({
        field: {
          name, onChange, value 
        }, fieldState: { error } 
      }) => (
        <label className={ twMerge(classNames("font-roboto text-base text-gray-400 flex-col flex gap-1 w-full ", {
          "text-red-500": error || isErrorRequestFrom,
          "text-gray-300": disabled,
          "text-blue-custom-def": isFocus,
        }, [addStylesLabel])) }
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
          <input
            className={ twMerge(classNames(`
            w-full bg-none font-roboto text-lg text-black
            placeholder:text-gray-custom placeholder:font-roboto
            placeholder:text-lg focus:outline-none border border-black/20 px-5 py-3 rounded-md border-gray-custom 
            disabled:text-gray-custom focus:border-blue-custom-def`, {
              "!border-red-500": error || isErrorRequestFrom,
            })) }
            disabled={ disabled } 
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
