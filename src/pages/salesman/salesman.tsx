import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import { CardSalesman, SliderProfile } from "@components/";
import { useAppSelector } from "@hooks/";
import { selectorSalesman, useGetAdsSalesmanQuery } from "@redux/";
import { Spinner } from "@shared/";


export const Salesman = () => {
  const navigate = useNavigate();
  const salesmanData = useAppSelector(selectorSalesman);
  const { data: adsSalesman, isLoading } = useGetAdsSalesmanQuery(salesmanData.id);

  return  (
    <div>
      { isLoading || !adsSalesman
        ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Spinner />
          </div>
        )
        : (
          <div className="flex flex-col gap-10 w-full">
            <div className="flex items-center gap-3">
              <button 
                className="w-fit h-fit block lg:hidden"
                onClick={ () => navigate(-1) }
              >
                <ChevronLeftIcon 
                  className="w-8 h-8 text-white stroke-black "
          
                />
              </button>

              <h1 className="text-2xl lg:text-4xl font-roboto lg:px-14 font-medium text-black">
                Профиль продавца
              </h1>
            </div>
            <div className="flex flex-col gap-16">
              <CardSalesman dataSalesman={ salesmanData } />
              { adsSalesman.length > 0
                ? <SliderProfile slideList={ adsSalesman } />
                : null }
            </div>
          </div>
        ) }
    </div>
  );
};
