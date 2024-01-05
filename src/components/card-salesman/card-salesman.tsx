import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { FC, useMemo, useState } from "react";

import { IUser } from "@interfaces/";
import { hidePhoneUser } from "@shared/";


interface ICardSalesmanProps {
    dataSalesman: IUser;
}


export const CardSalesman: FC<ICardSalesmanProps> = ({ dataSalesman }) => {
  const [isErrorLoadingAvatarSalesman, setIsErrorLoadingSalesman] = useState(false);
  const [isShowOpenPhone, setIsShowOpenPhone] = useState(false);

  const hidePhoneSalesman = useMemo(() => hidePhoneUser(dataSalesman.phone), [dataSalesman.phone]);

  return (
    <div className="flex items-center gap-12 px-14">
      <div className="w-32 h-32 rounded-full relative border border-black overflow-hidden">
        <img
          className="w-full h-full object-cover"
          onError={ () => setIsErrorLoadingSalesman(true) }
          src={ `${import.meta.env.VITE_API_URL}/${dataSalesman.avatar}` }
        />
        { isErrorLoadingAvatarSalesman
          ? <div className="w-full h-full absolute left-0 top-0 rounded-full bg-slate-300" />
          : null }
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="font-roboto font-semibold text-xl text-black">
            { dataSalesman.name }
          </p>
          <p className="font-roboto font-normal text-base text-black/70">{ dataSalesman.city }</p>
          <p className="font-roboto font-normal text-base text-black/70">
            { `Продает товары с ${format(new Date(dataSalesman.sells_from), "MMMM yyyy", {
              locale: ru
            })}` }
          </p>
        </div>
        { !isShowOpenPhone && hidePhoneSalesman
          ? (
            (
              <button 
                className="px-8 py-3 w-fit
                  disabled:bg-gray-custom bg-blue-custom-def hover:bg-blue-custom-hover
                  text-white font-roboto font-normal text-base rounded-md
                  focus:outline-none active:scale-90 transition
                  disabled:text-gray-600 disabled:cursor-default disabled:scale-100"
                onClick={ () => setIsShowOpenPhone(true) }
              >
                <p>Показать номер телефона</p>
                <p>{ hidePhoneSalesman?.hidePhone }</p>
              </button>
            )
          )
          : (
            <a 
              className="px-8 py-3 text-center w-fit
                  disabled:bg-gray-custom bg-blue-custom-def hover:bg-blue-custom-hover
                  text-white font-roboto font-normal text-base rounded-md
                  focus:outline-none active:scale-90 transition
                  disabled:text-gray-600 disabled:cursor-default disabled:scale-100"
              href={ `tel:${ hidePhoneSalesman?.showPhone }` }
            >
              <p>Позвонить по телефону</p>
              <p>{ hidePhoneSalesman?.showPhone }</p>
            </a>
          ) }
      </div>
    </div>
  );
}; 
