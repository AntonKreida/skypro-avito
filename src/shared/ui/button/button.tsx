import classNames from "classnames";
import { HTMLProps, FC } from "react";


interface IButtonProps extends HTMLProps<HTMLButtonElement> {
    type: "button" | "submit" | "reset";
    text: string;
}

export const Button: FC<IButtonProps> = ({ text, type ,...pops }) => (
  <button
    className={ classNames(`px-8 py-3 
    default:bg-gray-custom bg-blue-custom-def hover:bg-blue-custom-hover
    text-white font-roboto font-normal text-base rounded-md
    focus:outline-none active:scale-90 transition
    `) } 
    type={ type } 
    { ...pops }
  >
    { text }
  </button>
);
