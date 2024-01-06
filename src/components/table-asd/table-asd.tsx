import { FC } from "react";

import { IAsd } from "@interfaces/";

import { TableItemAsd } from "./table-item-asd";
import { TableItemSkeleton } from "./table-item-skeleton";


interface ITableAsd {
  itemsAsd: IAsd[] | undefined;
  isLoading: boolean;
}


export const TableAsd: FC<ITableAsd> = ({ itemsAsd, isLoading }) => {

  if(isLoading) {
    return (
      <div className="w-full h-fit grid grid-cols-3 gap-x-6 gap-y-12 pt-11">
        { Array.from({ length: 5 }).map((_, index) => <TableItemSkeleton key={ index } />) }
      </div>
    );
  }
  

  if(!itemsAsd) {
    return (
      <div className="w-full h-fit pt-11">
        <p className="text-center text-lg text-red-500">Что-то пошло не так...</p>
      </div>
    );
  }

  if(itemsAsd?.length === 0) {
    return (
      <div className="w-full h-fit pt-11">
        <p className="text-center text-lg">По вашему запросу ничего не найдено</p>
      </div>
    );
  }

  return (
    <div className="w-full h-fit grid grid-cols-2 gap-x-6 gap-y-12 xl:grid-cols-3 overflow-hidden pt-11 ">
      { itemsAsd.map((item) => (
        <TableItemAsd itemAsd={ item } key={ item.id } />
      )) }
    </div>
  );
}; 
