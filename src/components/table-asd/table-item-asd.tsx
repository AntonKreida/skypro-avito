import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

import { IAsd } from "@interfaces/";


interface ITableItemAsdProps {
    itemAsd: IAsd; 
}


export const TableItemAsd: FC<ITableItemAsdProps> = ({ itemAsd }) => {
  const [isError, setIsError] = useState(false);

  const handlerErrorImg = () => {
    setIsError(true);
  };
    

  return (
    <div 
      className="flex flex-col gap-5 items-center justify-center 
      col-span-1 shadow-lg rounded-md lg:shadow-none lg:rounded-none"
    >
      <div className="w-full h-[270px] relative">
        <img
          className="w-full h-full object-cover rounded" 
          onError={ handlerErrorImg }
          src={ `${import.meta.env.VITE_API_URL}/${itemAsd.images[0]?.url}` }
        />
        { isError
          ? (
            <div className="w-full h-full absolute left-0 top-0 bg-slate-300" />
          )
          : null }
      </div>
      <div className="flex flex-col gap-2 w-full p-3 pb-5 lg:p-0">
        <div className="w-full overflow-hidden">
          <Link to={ `/${itemAsd.id}` }>
            <p 
              className="font-roboto font-medium text-sm lg:text-xl text-blue-custom-def truncate"
            >
              { itemAsd.title }
            </p>
          </Link>
        </div>
        <div>
          <p className="font-roboto font-medium lg:text-lg text-base text-black">
            { itemAsd.price.toLocaleString("ru-RU", {
              style:"currency",
              currency: "RUB",
              maximumFractionDigits: 0
            }) }
          </p>
        </div>
        <div className="w-full flex flex-col gap-1 text-xs lg:text-base">
          <p className="font-roboto font-normal text-black/70">{ itemAsd.user.city }</p>
          <p className="font-roboto font-normal text-black/70">
            { formatDistanceToNow (new Date(itemAsd.created_on), { locale: ru, addSuffix: true }) }
          </p>
        </div>
      </div>
    </div>
  );
};
