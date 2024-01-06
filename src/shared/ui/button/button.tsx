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
    className={ twMerge(classNames(`px-5 py-2 
    disabled:bg-gray-custom bg-blue-custom-def hover:bg-blue-custom-hover
    text-white font-roboto font-normal text-xs rounded-md
    focus:outline-none active:scale-90 transition w-full
    disabled:text-gray-600 disabled:cursor-default disabled:scale-100
    md:text-base md:px-8 md:py-3 sm:text-sm
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
