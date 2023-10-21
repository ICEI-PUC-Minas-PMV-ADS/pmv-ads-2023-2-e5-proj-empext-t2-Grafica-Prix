import { useEffect, useRef, useState } from "react";
import CardProduct from "../../client/cardProduct";
import {
  ArrowButton,
  ContainerCarousel,
  ContainerCarouselProducts,
} from "./styles";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function CarouselProducts({ products, screenWidth }) {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(null);
  const [mouseMoved, setStateMouseMoved] = useState(0);

  const carouselProductsRef = useRef();

  function handleMouseDown(e) {
    setIsDown(true);

    if (e.pageX === undefined) {
      setStartX(e.touches[0].pageX - carouselProductsRef.current?.offsetLeft);
    } else {
      setStartX(e.pageX - carouselProductsRef.current?.offsetLeft);
    }

    setScrollLeftState(carouselProductsRef.current?.scrollLeft);
    setStateMouseMoved(0);
  }

  function handleMouseMove(e) {
    if (!isDown) {
      return;
    }

    const currentMousePositionInsideContainer =
      e.pageX === undefined
        ? e.touches[0].pageX - carouselProductsRef.current.offsetLeft
        : e.pageX - carouselProductsRef.current.offsetLeft;

    setStateMouseMoved(currentMousePositionInsideContainer - startX);
  }

  useEffect(() => {
    carouselProductsRef.current.scrollLeft = scrollLeftState - mouseMoved;
  }, [scrollLeftState, mouseMoved]);

  const width = screenWidth || carouselProductsRef.current?.clientWidth;

  function btnpressprev() {
    carouselProductsRef.current.scrollLeft =
      carouselProductsRef.current.scrollLeft - width;
  }

  function btnpressnext() {
    carouselProductsRef.current.scrollLeft =
      carouselProductsRef.current.scrollLeft + width;
  }

  return (
    <ContainerCarousel>
      <ArrowButton onClick={() => btnpressprev()} left>
        <RiArrowLeftSLine size={50} />
      </ArrowButton>
      <ContainerCarouselProducts
        ref={carouselProductsRef}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={() => setIsDown(false)}
        onMouseLeave={() => setIsDown(false)}
        onMouseMove={(e) => handleMouseMove(e)}
        onTouchStart={(e) => handleMouseDown(e)}
        onTouchEnd={() => setIsDown(false)}
        onTouchCancel={() => setIsDown(false)}
        onTouchMove={(e) => handleMouseMove(e)}
      >
        {products.map((product) => {
          return (
            <CardProduct
              url={product.image}
              name={product.name}
              price={product.price}
            />
          );
        })}
      </ContainerCarouselProducts>
      <ArrowButton onClick={() => btnpressnext()} right>
        <RiArrowRightSLine size={50} />
      </ArrowButton>
    </ContainerCarousel>
  );
}
