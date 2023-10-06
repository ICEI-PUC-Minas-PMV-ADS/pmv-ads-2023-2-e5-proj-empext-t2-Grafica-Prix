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
      slidesPerView={slidesPerView}
      loop={loop}
    >
      {children}
    </Swiper>
  );
}
