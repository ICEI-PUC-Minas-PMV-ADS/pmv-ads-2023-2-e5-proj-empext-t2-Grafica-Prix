import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import http from "../../../services/http";
import Container from "../../../components/common/container";
import Divisor from "../../../components/common/divisor";
import CardProduct from "../../../components/client/cardProduct";
import { getCategories } from "../../../services/api/categories";
import Text from "../../../components/common/text";

export default function SearchResult() {
  const { state } = useLocation();
  const [productsSearch, setProductsSearch] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    http.get(`api/Produto/nome/${state.search_result}`).then((res) => {
      setProductsSearch(res.data);
    });
  }, [state]);

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    let data = [];
    let categoriesList = categories.data;
    let products = [];

    if (productsSearch?.length === 0) {
      setData([]);
      return;
    }

    if (productsSearch?.length > 0) {
      for (let key in categoriesList) {
        products = productsSearch?.filter(
          (p) => p.categoriaId === categoriesList[key].id
        );

        data.push({
          category: products?.length > 0 && categoriesList[key]?.nome,
          products,
        });

        setData(data);
      }
    }
  }, [categories.data, productsSearch]);

  return (
    <Container minHeight="calc(100vh - 70px)">
      {productsSearch && data && categories.data && (
        <Divisor direction="column">
          {data?.map((item) => {
            return (
              <Divisor direction="column">
                <Text size="20px" weight="600">
                  {item.category}
                </Text>
                <Divisor>
                  {item.products?.map((product) => {
                    return <CardProduct product={product} />;
                  })}
                </Divisor>
              </Divisor>
            );
          })}
        </Divisor>
      )}
    </Container>
  );
}
