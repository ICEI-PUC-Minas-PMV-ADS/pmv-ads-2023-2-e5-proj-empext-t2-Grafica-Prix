import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getProducts } from "../../../services/api/products";
import { useQuery } from "@tanstack/react-query";

export default function SearchResult() {
  const { state } = useLocation();
  const [productsSearch, setProductsSearch] = useState();

  const products = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useEffect(() => {}, []);

  console.log(state.search_result);

  return <p></p>;
}
