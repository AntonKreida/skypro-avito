import classNames from "classnames";
import { useState, FC } from "react";
import "swiper/css/thumbs";
import { Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";


interface ISliderCardProps {
    slidersList: {
        id: number;
        ad_id: number;
        url: string;
    }[]
}

export const SliderCard: FC<ISliderCardProps> = ({ slidersList }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3 w-full">
      <Swiper
        className="w-full h-full"
        modules={ [Thumbs] }
        onActiveIndexChange={ ({ activeIndex }) => setActiveIndex(activeIndex) }
        onInit={ (swiper) => {
          swiper.allowTouchMove = false;
        } }
        spaceBetween={ 10 }
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed
            ? thumbsSwiper
            : null 
        }}
      >
        { slidersList.map((slider) => (
          <SwiperSlide key={ slider.id }>
            <img
              className="w-full h-full object-cover rounded"
              src={ `${import.meta.env.VITE_API_URL}/${slider.url}` }
            />
          </SwiperSlide>
        )) }
      </Swiper>
      <Swiper
        className="w-full"
        freeMode={ true }
        modules={ [Thumbs] }
        onSwiper={ setThumbsSwiper }
        slidesPerView={ 5 }
        spaceBetween={ 10 }
        watchSlidesProgress={ true }
      >
        { slidersList.map((slider, index) => (
          <SwiperSlide key={ slider.id }>
            <div 
              className={ classNames("w-full h-full border-2 rounded", 
                { "border-blue-custom-def": activeIndex === index }) }
            >
              <img
                className={ classNames("w-full h-full object-cover rounded") }
                src={ `${import.meta.env.VITE_API_URL}/${slider.url}` }
              />
            </div>
          </SwiperSlide>
        )) }
      </Swiper>
    </div>
  );
};
