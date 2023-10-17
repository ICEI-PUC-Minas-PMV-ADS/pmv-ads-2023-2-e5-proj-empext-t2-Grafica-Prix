import { SwiperSlide } from "swiper/react";
import Banner from "../../../components/client/banner";
import Section from "../../../components/client/section";
import SwiperComponent from "../../../components/common/swiper";
import CardProduct from "../../../components/client/cardProduct";

export default function Home(props) {
  const banners = [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ];
  const products = [
    {
      image: "",
      name: "Nome do produto",
      price: "RS 99,90",
    }
  ]
  return (
    <>
      <Banner images={banners} />
      <Section title="Canecas">
          <SwiperComponent
          slidesPerView={4}
          countItems={products?.length}
          height="auto"
        >
          {products?.map((product, index) => {
            return (
              <SwiperSlide key={index + 10023332}>
                <CardProduct url={product.image} name={product.name} price={product.price}/>
              </SwiperSlide>
            );
          })}
        </SwiperComponent>
      </Section>
    </>
  );
}
