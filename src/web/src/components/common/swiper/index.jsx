import { Swiper } from "swiper/react";

export default function SwiperComponent({
  children,
  slidesPerView,
  loop,
  height,
  breakpoints,
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
      breakpoints={breakpoints}
      slidesPerView={slidesPerView}
      loop={loop}
    >
      {children}
    </Swiper>
  );
}
