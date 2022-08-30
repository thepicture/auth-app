import { useEffect, useState } from "react";

import { Typography } from "@mui/material";

import { Product } from "../ProductsPage";
import ProductsList from "./ProductsList/ProductsList";
import SearchBar from "./SearchBar/SearchBar";

interface ProductProps {
  products: Product[];
  onShoppingCartAdd: (id: number) => void;
}

export interface ShoppingCart {
  id: number;
  title: string;
}

export default function ProductsContainer(props: ProductProps) {
  const [filteredCollection, setFilteredConnection] = useState<Product[]>([]);

  useEffect(() => {
    setFilteredConnection(props.products);
  }, [props.products]);

  function handleQueryChange(query: string) {
    if (!query) setFilteredConnection(props.products);
    else
      setFilteredConnection(
        props.products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      );
  }

  return (
    <>
      <Typography component="h1" variant="h3" textAlign="center">
        Products List (count in shopping cart:
        {" " + props.products.filter((g) => g.isInShoppingCart).length})
      </Typography>
      <SearchBar target={props.products} onQueryChange={handleQueryChange} />
      {filteredCollection.length > 0 ? (
        <ProductsList
          products={filteredCollection}
          canCartAdd
          onShoppingCartAdd={props.onShoppingCartAdd}
        />
      ) : (
        <Typography component="h2" variant="h3" textAlign="center">
          Products not found
        </Typography>
      )}
    </>
  );
}
