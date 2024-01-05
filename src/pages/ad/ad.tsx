import { useParams } from "react-router-dom";

import { CardAd } from "@/components";
import { useGetAdCommentQuery, useGetAdQuery } from "@redux/";


export const Ad = () => {
  const params = useParams();
  const { data: dataAd, isLoading: isLoadingAd } = useGetAdQuery(params.idAd as string);
  const { data: dataComments, isLoading: isLoadingComments } = useGetAdCommentQuery(params.idAd as string);

  if(isLoadingComments || isLoadingAd || !dataAd || !dataComments) {
    return null;
  }

  return ( 
    <CardAd 
      dataAd={ dataAd }
      dataCommentsAd={ dataComments }
    />
  );
};
