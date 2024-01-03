import classNames from "classnames";
import { HTMLProps, FC } from "react";
import { twMerge } from "tailwind-merge";


interface IButtonProps extends HTMLProps<HTMLButtonElement> {
    type: "button" | "submit" | "reset";
    text: string;
    className?: string;
    sizeButton?: "smile";
    colors?: "white";
}

export const Button: FC<IButtonProps> = ({
  text, className, type, sizeButton, colors, ...props 
}) => (
  <button
    className={ twMerge(classNames(`px-8 py-3 
    disabled:bg-gray-custom bg-blue-custom-def hover:bg-blue-custom-hover
    text-white font-roboto font-normal text-base rounded-md
    focus:outline-none active:scale-90 transition w-full
    disabled:text-gray-600 disabled:cursor-default
    `, {
      "px-6 py-2 border border-white w-fit": sizeButton,
      "border border-gray-custom text-black bg-white hover:bg-gray-custom": colors
    }, [className])) } 
    type={ type } 
    { ...props }
  >
    { text }
  </button>
);
