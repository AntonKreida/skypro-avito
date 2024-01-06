/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { HTMLProps, FC } from "react";
import { Controller, Control } from "react-hook-form";


interface IInputPops extends HTMLProps<HTMLInputElement> {
    name: string;
    control: Control<any>
}


export const Input: FC<IInputPops> = ({ name, control, ...props }) => (
  <Controller
    control={ control }
    name={ name }
    render={ ({ field: { onChange, value } }) => (
      <input
        className={ classNames(`
    w-full py-2 bg-none font-roboto text-sm
    placeholder:text-gray-custom placeholder:font-roboto
    placeholder:text-sm focus:outline-none border-b border-gray-custom 
    disabled:text-gray-custom md:text-lg md:placeholder:text-lg rounded-full border 
    sm:border-x-0 sm:border-t-0 sm:border-b px-4 sm:px-0 sm:rounded-none
    `) }
        onChange={ onChange }
        value={ value } 
        { ...props }
      />
    ) }
  />
);
