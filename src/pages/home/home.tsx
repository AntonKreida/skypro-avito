import { ChangeEvent, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import Logo from "@assets/icon/logo-main.svg?react";
import { TableAsd } from "@components/";
import { IAsd, IOutletContext } from "@interfaces/";
import { useGetAdsQuery } from "@redux/";
import { Button, InputSearch } from "@shared/";


export const Home = () => {
  const { data, isLoading } = useGetAdsQuery(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [listAsdFilter, setListAsdFilter] = useState<IAsd[]>([]);

  const { valuesAsdForSearch } = useOutletContext<IOutletContext>();

  const handlerSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchValue(value);
  };

  const handlerOnClickFilter = () => {
    if(data) {
      setListAsdFilter(data.filter((item) => item.title.toLocaleLowerCase()
        .startsWith(searchValue.toLocaleLowerCase())));
    }
  };

  useEffect(() =>{
    if(!data || isLoading) {
      return;
    }

    setListAsdFilter(data);
  }, [data, isLoading]);

  useEffect(() => {

    if(data) {
      setListAsdFilter(data.filter((item) => item.title.toLocaleLowerCase()
        .startsWith(valuesAsdForSearch.toLocaleLowerCase())));
    }

  }, [data, valuesAsdForSearch]);

  return (
    <>
      <div className="hidden justify-between pt-11 gap-14 w-full h-fit items-center lg:flex">
        <Logo />
        <div className="flex gap-1 w-full">
          <InputSearch
            disabled={ isLoading } 
            onChange={ handlerSearch } 
            placeholder="Поиск по объявлениям..."
            value={ searchValue }
          />
          <Button 
            className="w-fit"
            disabled={ isLoading }
            onClick={ handlerOnClickFilter }
            text="Найти" 
            type="button"
          />
        </div>
      </div>
      <TableAsd 
        isLoading={ isLoading }
        itemsAsd={ listAsdFilter }
      />
    </>
  );
};
