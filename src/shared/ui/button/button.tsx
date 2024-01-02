import classNames from "classnames";
import { HTMLProps, FC } from "react";


interface IButtonProps extends HTMLProps<HTMLButtonElement> {
    type: "button" | "submit" | "reset";
    text: string;
    className?: string;
    sizeButton?: "smile";
}

export const Button: FC<IButtonProps> = ({
  text, className, type, sizeButton, ...pops 
}) => (
  <button
    className={ classNames(`px-8 py-3 
    default:bg-gray-custom bg-blue-custom-def hover:bg-blue-custom-hover
    text-white font-roboto font-normal text-base rounded-md
    focus:outline-none active:scale-90 transition w-full
    `, {
      "px-6 py-2": sizeButton
    }, [className]) } 
    type={ type } 
    { ...pops }
  >
    { text }
  </button>
);
