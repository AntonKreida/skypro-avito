import classNames from "classnames";
import { HTMLProps, FC } from "react";


interface IInputSearchProps extends HTMLProps<HTMLInputElement> {}

export const InputSearch: FC<IInputSearchProps> = ({ ...props }) => (
  <input
    className={ classNames(`
        w-full py-3 px-5 bg-none font-roboto text-lg
        border border-black/20 focus:outline-none
        placeholder:text-black/30 placeholder:font-roboto
        placeholder:text-lg
        `) }
    { ...props }
  />
);
