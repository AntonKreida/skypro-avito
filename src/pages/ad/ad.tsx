import { useParams } from "react-router-dom";

import { CardAd } from "@/components";
import { Spinner } from "@/shared";
import { useGetAdCommentQuery, useGetAdQuery } from "@redux/";


export const Ad = () => {
  const params = useParams();
  const { 
    data: dataAd, 
    isLoading: isLoadingAd, 
    isError: isErrorAd,
    isSuccess: isSuccessAd 
  } = useGetAdQuery(params.idAd as string);
  const {
    data: dataComments, 
    isLoading: isLoadingComments, 
    isError: isErrorComments,
    isSuccess: isSuccessComments 
  } = useGetAdCommentQuery(params.idAd as string);

  if(isLoadingComments || isLoadingAd) {
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Spinner />
    </div>;
  }

  if(isErrorComments || isErrorAd) {
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-2xl">Произошла ошибка! Пожалуйста, перезапустите страницу!</p>
    </div>;
  }

  return isSuccessAd && isSuccessComments
    ? (
      <div className="flex flex-col gap-10 w-full">
        <CardAd
          dataAd={ dataAd }
          dataCommentsAd={ dataComments }
        />
      </div>
    )
    : null; };
