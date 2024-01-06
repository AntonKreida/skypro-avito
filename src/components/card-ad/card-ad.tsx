import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { formatDistanceToNow } from "date-fns";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  FC, MouseEvent, useMemo, useState, useEffect, 
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ModalComment, ModalEditAd } from "@/components/modals";
import { SliderCard } from "@/components/sliders/";
import { useAppDispatch } from "@hooks/";
import { IAsd, IComment, IUser } from "@interfaces/";
import { setCurrentSalesman, useDeleteAdsMutation, useGetCurrentUserProfileQuery } from "@redux/";
import {
  Backdrop, Button, hidePhoneUser 
} from "@shared/";


interface ICardAdProps {
    dataAd: IAsd
    dataCommentsAd: IComment[]
}


export const CardAd: FC<ICardAdProps> = ({ dataAd, dataCommentsAd }) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();

  const { data } = useGetCurrentUserProfileQuery(null);
  const [deleteAd, { isSuccess }] = useDeleteAdsMutation();


  const [isShowOpenPhone, setIsShowOpenPhone] = useState(false);
  const [isErrorLoadingAvatarUser, setIsErrorLoadingAvatarUser] = useState(false);
  const [isOpenModalComment, setIsOpenModalComment] = useState(false);
  const hidePhoneCurrentUserAd = useMemo(() => hidePhoneUser(dataAd.user.phone), [dataAd.user.phone]);

  const [isOpenModalEditAd, setIsOpenModalEditAd] = useState(false);

  const handlerOnClickOpenModal = () => {
    setIsOpenModalComment(true);
  };

  const handlerOnClickCloseModal = (event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpenModalComment(false);
  };

  const handlerOnClickOpenModalEditAd = () => {
    setIsOpenModalEditAd(true);
  };

  const handlerOnClickCloseModalEditAd = (event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpenModalEditAd(false);
  };


  const handlerDeleteAd = async () => {
    await deleteAd(dataAd.id).unwrap();
  };

  useEffect(() => {
    dispatch( setCurrentSalesman(dataAd.user));
  }, [dataAd, dispatch]);

  useEffect(() => {
    if(isSuccess) {
      navigate("/");
    } else {
      setIsErrorLoadingAvatarUser(true);
    }
  }, [isSuccess, navigate]);

  return (
    <div 
      className="grid grid-cols-1 
      grid-flow-row lg:grid-cols-2 w-full gap-0 lg:gap-14 
      overflow-x-hidden items-center pb-12 lg:pb-0 relative"
    >
      { dataAd.images.length > 0
        ? (<SliderCard slidersList={ dataAd.images } />)
        : (
          <div 
            className="max-h-[800px] h-[800px] relative top-0 left-0 lg:h-full w-full bg-slate-400 
            col-span-2 lg:grid-cols-1 row-span-1 lg:col-span-1 rounded"
          />
        ) }
      <div 
        className={ classNames(`flex flex-col gap-9 mt-5 lg:m-0 col-span-2 
        lg:grid-cols-1 lg:col-span-1
        drop-shadow row-span-1`, {
          "px-6": params?.idAd && !params?.idSalesman,
        }) } 
      >
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
          { data?.id !== dataAd.user_id
            ? (
              <div className="flex">
                { !isShowOpenPhone && hidePhoneCurrentUserAd 
                  ? (
                    (
                      <button 
                        className="px-8 py-3 w-full
                    disabled:bg-gray-custom bg-blue-custom-def hover:bg-blue-custom-hover
                    text-white font-roboto font-normal text-base rounded-md
                    focus:outline-none active:scale-90 transition lg:w-fit
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
                      className="px-8 py-3 text-center w-full lg:w-fit h-fit
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
            )
            : (
              <div className="flex items-center flex-col gap-3 lg:flex-row">
                <Button
                  className="lg:w-fit"
                  onClick={ handlerOnClickOpenModalEditAd }
                  text="Редактировать"
                  type="button"
                />
                <Button
                  className="lg:w-fit"
                  onClick={ handlerDeleteAd }
                  text="Снять с публикации"
                  type="button"
                />
              </div>
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
        <div className={ classNames("col-span-2 mt-10 lg:m-0", {
          "px-6": params?.idAd && !params?.idSalesman,
        }) }
        >
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
              dataAd={ dataAd }
              dataUser={ data as IUser }
              onClickCloseModal={ handlerOnClickCloseModal }
            />
          </Backdrop>
        )
        : null }
      { isOpenModalEditAd
        ? (
          <Backdrop 
            onClick={ handlerOnClickCloseModal }
          >
            <ModalEditAd 
              dataAd={ dataAd }
              onClickCloseModal={ handlerOnClickCloseModalEditAd }
              setIsOpenModal={ setIsOpenModalEditAd }
            />
          </Backdrop>
        )
        : null }
      <ChevronLeftIcon 
        className="w-10 h-10 text-white absolute left-0 top-16 cursor-pointer stroke-black z-[900] block lg:hidden"
        onClick={ () => navigate("/") }
      />
    </div>
  );
};
