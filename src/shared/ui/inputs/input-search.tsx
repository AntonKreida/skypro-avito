import classNames from "classnames";
import { HTMLProps, FC } from "react";


interface IInputSearchProps extends HTMLProps<HTMLInputElement> {
  className?: string
}

export const InputSearch: FC<IInputSearchProps> = ({ className, ...props }) => (
  <input
    className={ classNames(`
        w-full py-3 px-5 bg-none font-roboto text-sm
        border border-black/20 focus:outline-none
        placeholder:text-black/30 placeholder:font-roboto
        placeholder:text-sm rounded-full lg:rounded-md md:text-lg md:placeholder:text-lg
        `, [className]) }
    { ...props }
  />
);
