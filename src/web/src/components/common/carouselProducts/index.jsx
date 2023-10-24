import { useRef } from "react";
import CardProduct from "../../client/cardProduct";
import {
  ArrowButton,
  ContainerCarousel,
  ContainerCarouselProducts,
} from "./styles";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function CarouselProducts({ products, rollMeasure }) {
  const carousel = useRef();

  function prev(e) {
    e.preventDefault();
    carousel.current.scrollLeft -= rollMeasure || carousel.current?.offsetWidth;
  }

  function next(e) {
    e.preventDefault();
    carousel.current.scrollLeft += rollMeasure || carousel.current?.offsetWidth;
  }

  return (
    <ContainerCarousel>
      <ArrowButton>
        <RiArrowLeftSLine onClick={prev} size={50} />
      </ArrowButton>
      <ContainerCarouselProducts ref={carousel}>
        {products?.map((product) => {
          return <CardProduct product={product} />;
        })}
      </ContainerCarouselProducts>
      <ArrowButton>
        <RiArrowRightSLine onClick={next} size={50} />
      </ArrowButton>
    </ContainerCarousel>
  );
}
