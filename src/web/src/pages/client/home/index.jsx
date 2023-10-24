import { SwiperSlide } from "swiper/react";
import Banner from "../../../components/client/banner";
import Section from "../../../components/client/section";
import SwiperComponent from "../../../components/common/swiper";
import CardProduct from "../../../components/client/cardProduct";
import { getCategories } from "../../../services/api/categories";
import { useQuery } from "@tanstack/react-query";
import CarouselProducts from "../../../components/common/carouselProducts";
import { getProducts } from "../../../services/api/products";

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

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const products = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <>
      <Banner images={banners} />
      {categories.data?.map((category) => {
        return (
          <Section title={category.nome}>
            <CarouselProducts products={products.data} rollMeasure={150} />
          </Section>
        );
      })}
    </>
  );
}
