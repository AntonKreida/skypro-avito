/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { FC } from "react";
import { Controller, Control } from "react-hook-form";
import { twMerge } from "tailwind-merge";


interface IInputProfileProps {
    control: Control<any>;
    name: string;
    labelTitle: string;
    placeholder?: string;
    disabled: boolean;
    isErrorRequestFrom: boolean;
}

export const InputProfile: FC<IInputProfileProps> = ({ 
  control, 
  name, 
  labelTitle, 
  placeholder, 
  disabled,
  isErrorRequestFrom,
}) => (
  <Controller
    control={ control }
    name={ name }
    render={ ({
      field: {
        name, onChange, onBlur, value 
      }, fieldState: { error } 
    }) => (
      <label className={ twMerge(classNames("font-roboto text-base text-gray-400 flex-col flex gap-1", {
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
          onBlur={ onBlur }
          onChange={ onChange }
          placeholder={ placeholder }
          value={ value }
        /> 
      </label>
    ) }
  />
);
