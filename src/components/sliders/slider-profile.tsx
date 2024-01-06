import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { FC, useState, useRef } from "react";
import { type Swiper as SwiperRef } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { IAsd } from "@interfaces/";

import { SliderItemAsd } from "./slider-item-asd";


interface ISliderProfileProps {
    slideList: IAsd[]
}

export const SliderProfile: FC<ISliderProfileProps> = ({ slideList }) => {
  const swiperRef = useRef<SwiperRef>();
  const [progressSlide, setProgressSlide] = useState(0);
  const [isEndSlide, setIsEndSlide] = useState(false);


  return (
    <div className="flex flex-col gap-5 w-full">
      <h2 className="text-3xl font-roboto font-medium px-14">Мои товары</h2>
      <div className="hidden gap-5 items-center lg:flex">
        <button 
          className="w-10 h-10 border-none bg-none disabled:opacity-0 active:scale-[0.8] transition"
          disabled={ progressSlide <= 0 }
          onClick={ () => swiperRef.current?.slidePrev() }
        >
          <ChevronLeftIcon />
        </button>
        <Swiper
          className="w-full h-full"
          onInit={ (swiper) => {
            swiper.allowTouchMove = false;
            setIsEndSlide(swiper.isEnd);
          } }
          onProgress={ (_swiper, progress) => {
            setProgressSlide(progress);
          } }
          onSwiper={ (swiper) => {
            swiperRef.current = swiper;
          } }
          pagination={{ clickable: true }}
          slidesPerView={ 4 }
          spaceBetween={ 30 }

        >
          { slideList.map((item) => (
            <SwiperSlide key={ item.id }>
              <SliderItemAsd itemAsd={ item } />
            </SwiperSlide>
          )) }
        </Swiper>
        <button 
          className="w-10 h-10 border-none bg-none disabled:opacity-0 active:scale-[0.8] transition"
          disabled={ progressSlide >= 1 || isEndSlide }
          onClick={ () => swiperRef.current?.slideNext() }
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="grid lg:hidden grid-cols-2 gap-2">
        { slideList.map((item) => (
          <SliderItemAsd itemAsd={ item } key={ item.id } />
        )) }
      </div>
    </div>
  );
};
