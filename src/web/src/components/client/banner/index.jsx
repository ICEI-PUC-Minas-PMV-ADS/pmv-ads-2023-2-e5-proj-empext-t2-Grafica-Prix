import React from "react";
import { ImageBanner } from "./styles";
import SwiperComponent from "../../common/swiper";
import { SwiperSlide } from "swiper/react";

export default function Banner({ images, image, carousel }) {
  return (
    <SwiperComponent
      slidesPerView={1}
      countItems={images?.length}
      height="auto"
    >
      {carousel ? (
        images?.map((banner, index) => {
          return (
            <SwiperSlide key={index + 10023332}>
              <ImageBanner src={banner.image} />
            </SwiperSlide>
          );
        })
      ) : (
        <ImageBanner src={image} />
      )}
    </SwiperComponent>
  );
}
