import { formatDistanceToNow } from "date-fns";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  FC, MouseEvent, useMemo, useState, useEffect, 
} from "react";
import { Link } from "react-router-dom";

import { ModalComment } from "@/components/modals";
import { SliderCard } from "@/components/sliders/slider-card";
import { useAppDispatch } from "@hooks/";
import { IAsd, IComment } from "@interfaces/";
import { setCurrentSalesman, useGetCurrentUserProfileQuery } from "@redux/";
import { Backdrop, hidePhoneUser } from "@shared/";


interface ICardAdProps {
    dataAd: IAsd
    dataCommentsAd: IComment[]
}


export const CardAd: FC<ICardAdProps> = ({ dataAd, dataCommentsAd }) => {
  const dispatch = useAppDispatch();
  const { data } = useGetCurrentUserProfileQuery(null);


  const [isShowOpenPhone, setIsShowOpenPhone] = useState(false);
  const [isErrorLoadingAvatarUser, setIsErrorLoadingAvatarUser] = useState(false);
  const [isOpenModalComment, setIsOpenModalComment] = useState(false);
  const hidePhoneCurrentUserAd = useMemo(() => hidePhoneUser(dataAd.user.phone), [dataAd.user.phone]);

  const handlerOnClickOpenModal = () => {
    setIsOpenModalComment(true);
  };

  const handlerOnClickCloseModal = (event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpenModalComment(false);
  };


  useEffect(() => {
    dispatch( setCurrentSalesman(dataAd.user));
  }, [dataAd, dispatch]);


  return (
    <div className="grid grid-cols-2 w-full gap-14">
      <SliderCard slidersList={ dataAd.images } />
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-2">
          <h2 className="font-roboto font-bold text-3xl">{ dataAd.title }</h2>
          <div className="flex flex-col">
            <p className="font-roboto font-normal text-base text-black/70">{ dataAd.user.city }</p>
            <p className="font-roboto font-normal text-base text-black/70">
              { formatDistanceToNow (new Date(dataAd.created_on), { locale: ru, addSuffix: true }) }
            </p>
            { dataCommentsAd.length > 0
              ? (
                <button 
                  className="w-fit font-roboto font-normal text-base text-blue-custom-def"
                  onClick={ handlerOnClickOpenModal }
                >
                  { dataCommentsAd.length > 1
                    ?  `${dataCommentsAd.length + 1} отзыва`
                    : `${dataCommentsAd.length + 1} отзыв` }
                </button>  
              )
              : (
                <p className="w-fit font-roboto font-normal text-base text-blue-custom-def">
                  Нет отзывов
                </p>  
              ) }
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-roboto font-bold text-3xl text-black">
            { dataAd.price.toLocaleString("ru-RU", {
              style:"currency",
              currency: "RUB",
              maximumFractionDigits: 0
            }) }
          </p>
          { !isShowOpenPhone && hidePhoneCurrentUserAd
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
                  <p>{ hidePhoneCurrentUserAd?.hidePhone }</p>
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
                href={ `tel:${ hidePhoneCurrentUserAd?.showPhone }` }
              >
                <p>Позвонить по телефону</p>
                <p>{ hidePhoneCurrentUserAd?.showPhone }</p>
              </a>
            ) }
        </div>
        <Link 
          className="flex w-fit gap-3 items-center"
          to={ data?.id !== dataAd.user_id
            ?  `/${dataAd.id}/${dataAd.user_id}`
            : "/profile" }
        >
          <div className="w-10 h-10 relative rounded-full border border-black overflow-hidden">
            <img
              alt="avatar"
              className="w-full h-full object-cover"
              onError={ () => setIsErrorLoadingAvatarUser(true) }
              src={ `${import.meta.env.VITE_API_URL}/${dataAd.user.avatar}` }
            />
            { isErrorLoadingAvatarUser
              ? <div className="w-full h-full absolute left-0 top-0 rounded-full bg-slate-300" />
              : null }
          </div>
          <div className="flex flex-col">
            <p className="font-roboto font-semibold text-xl text-blue-custom-def">{ dataAd.user.name }</p>
            <p 
              className="font-roboto font-normal text-base text-black/70"
            >
              { `Продает товары с ${format(new Date(dataAd.user.sells_from), "MMMM yyyy", {
                locale: ru
              })}` }
            </p>
          </div>
        </Link>
      </div>
      { !!dataAd.description && (
        <div className="col-span-2 ">
          <div className="flex flex-col gap-5 w-5/6">
            <h2 className="text-3xl font-roboto font-medium">Описание товара</h2>
            <p className="text-lg font-roboto font-normal">{ dataAd.description }</p>
          </div>
        </div>
      ) }

      { isOpenModalComment
        ? (
          <Backdrop 
            onClick={ handlerOnClickCloseModal }
          >
            <ModalComment 
              commentList={ dataCommentsAd }
              onClickCloseModal={ handlerOnClickCloseModal }
            />
          </Backdrop>
        )
        : null }
    </div>
  );
};
