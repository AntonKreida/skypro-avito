import { CardSalesman, SliderProfile } from "@components/";
import { useAppSelector } from "@hooks/";
import { selectorSalesman, useGetAdsSalesmanQuery } from "@redux/";
import { Spinner } from "@shared/";


export const Salesman = () => {
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
            <h1 className="text-4xl font-roboto px-14 font-medium text-black">
              Профиль продавца
            </h1>
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
