import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

import { IAsd } from "@interfaces/";


interface ISliderItemAsdProps {
    itemAsd: IAsd; 
}


export const SliderItemAsd: FC<ISliderItemAsdProps> = ({ itemAsd }) => {
  const [isError, setIsError] = useState(false);

  const handlerErrorImg = () => {
    setIsError(true);
  };
    

  return (
    <div className="flex flex-col gap-5 items-center justify-center col-span-1">
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
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full overflow-hidden">
          <Link to={ `/${itemAsd.id}` }>
            <p className="font-roboto font-medium text-xl text-blue-custom-def h-8 truncate">{ itemAsd.title }</p>
          </Link>
        </div>
        <div>
          <p className="font-roboto font-medium text-lg text-black">
            { itemAsd.price.toLocaleString("ru-RU", {
              style:"currency",
              currency: "RUB",
              maximumFractionDigits: 0
            }) }
          </p>
        </div>
        <div className="w-full flex flex-col gap-1">
          <p className="font-roboto font-normal text-base text-black/70">{ itemAsd.user.city }</p>
          <p className="font-roboto font-normal text-base text-black/70">
            { formatDistanceToNow (new Date(itemAsd.created_on), { locale: ru, addSuffix: true }) }
          </p>
        </div>
      </div>
    </div>
  );
};

