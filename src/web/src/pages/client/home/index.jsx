import Banner from "../../../components/client/banner";
import Section from "../../../components/client/section";
import { getCategories } from "../../../services/api/categories";
import { useQuery } from "@tanstack/react-query";
import CarouselProducts from "../../../components/common/carouselProducts";
import { useEffect, useState } from "react";
import { getBanners } from "../../../services/api/banners";
export default function Home() {
  const [restOfCategories, setRestOfCategories] = useState();

  const banners = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    let allCategories = categories.data && [...categories.data];
    allCategories?.shift();
    setRestOfCategories(allCategories);
  }, [categories.data]);

  return (
    <>
      {banners.data && <Banner images={banners.data} carousel />}
      <Section title={categories.data && categories.data[0]?.nome}>
        <CarouselProducts
          products={categories.data && categories.data[0]?.produtos}
          rollMeasure={150}
        />
      </Section>
      <Banner />
      {restOfCategories?.map((category) => {
        return (
          category?.produtos?.length > 0 && (
            <Section title={category.nome}>
              <CarouselProducts
                products={category.produtos}
                rollMeasure={150}
              />
            </Section>
          )
        );
      })}
    </>
  );
}
