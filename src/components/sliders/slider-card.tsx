import classNames from "classnames";
import { useState, FC, useEffect } from "react";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Thumbs, Pagination } from "swiper/modules";
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
  const [windowWidth, setWindowWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handlerWindowResize = (event: UIEvent) => {
      if (event.target) {
        setWindowWidth((event.target as Window).innerWidth);
      }
    };
    window.addEventListener("resize", handlerWindowResize);

    return () => {
      window.removeEventListener("resize", handlerWindowResize);
    };
  }, []);

  return (
    <div 
      className="flex flex-col gap-3 w-full overflow-hidden col-span-2 lg:grid-cols-1 lg:col-span-1 row-span-1 relative"
    >
      <Swiper
        className="w-full h-full"
        modules={ [Thumbs, Pagination] }
        onActiveIndexChange={ ({ activeIndex }) => setActiveIndex(activeIndex) }
        onResize={ ( swiper ) => {
          swiper.allowTouchMove =
          windowWidth <= 1024
            ? true
            : false;
        } }
        pagination={ windowWidth <= 1024
          ? true
          : false }
        spaceBetween={ 10 }
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed
            ? thumbsSwiper
            : null 
        }}
        wrapperClass="items-center"
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
        className="w-full hidden lg:flex items-center"
        freeMode={ true }
        modules={ [Thumbs] }
        onSwiper={ setThumbsSwiper }
        slidesPerView={ 5 }
        spaceBetween={ 10 }
        watchSlidesProgress={ true }
        wrapperClass="items-center"
      >
        { slidersList.map((slider, index) => (
          <SwiperSlide className="w-full h-full" key={ slider.id }>
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
