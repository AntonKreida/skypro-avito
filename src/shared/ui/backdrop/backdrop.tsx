import classNames from "classnames";
import { motion } from "framer-motion";
import {
  useEffect, FC, MouseEventHandler 
} from "react";


interface IBackdropProps {
  children?: React.ReactNode;
  withNoPadding?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

export const Backdrop: FC<IBackdropProps> = ({
  children,
  withNoPadding,
  onClick,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={ classNames(
        `bg-black/50 fixed inset-0 flex items-start justify-center z-[1001] overflow-y-auto
        scrollbar-thin scrollbar-track-gray-200 scrollbar-track-rounded 
        scrollbar-thumb-slate-400 scrollbar-thumb-rounded`,
        { "p-8": !withNoPadding }
      ) }
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={ onClick }
    >
      { children }
    </motion.div>
  );
};
