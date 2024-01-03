import { ChangeEvent, useEffect, useState } from "react";

import Logo from "@assets/icon/logo-main.svg?react";
import { TableAsd } from "@components/";
import { IAsd } from "@interfaces/";
import { useGetAdsQuery } from "@redux/";
import { Button, InputSearch } from "@shared/";


export const Home = () => {
  const { data, isLoading } = useGetAdsQuery(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [listAsdFilter, setListAsdFilter] = useState<IAsd[]>([]);

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

  return (
    <>
      <div className="flex justify-between gap-14 w-full h-fit py-11 items-center">
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
