import { Swiper } from "swiper/react";

export default function SwiperComponent({ children, slidesPerView }) {
  return (
    <Swiper
      style={{
        "--swiper-pagination-color": "#FF5757",
        width: "100%",
      }}
      slidesPerView={slidesPerView}
      navigation
      autoplay={{ delay: 5000, disableOnInteraction: false }}
    >
      {children}
    </Swiper>
  );
}
