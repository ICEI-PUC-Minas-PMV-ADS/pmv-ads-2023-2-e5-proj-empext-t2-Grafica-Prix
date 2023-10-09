import { Swiper } from "swiper/react";

export default function SwiperComponent({
  children,
  slidesPerView,
  loop,
  height,
}) {
  return (
    <Swiper
      style={{
        "--swiper-pagination-color": "#FF5757",
        width: "100%",
        height: height || "250px",
      }}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        390: {
          slidesPerView: 2,
        },
        502: {
          slidesPerView: 3,
        },
        1034: {
          slidesPerView: 4,
        },
        1280: {
          slidesPerView: 3,
        },
      }}
      loop={loop}
    >
      {children}
    </Swiper>
  );
}
