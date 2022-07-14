import { Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Goods } from "../GoodsPage";
import GoodsList from "./GoodsList/GoodsList";
import SearchBar from "./SearchBar/SearchBar";

interface GoodsProps {
  goods: Goods[];
  onShoppingCartAdd: (id: number) => void;
}

export interface ShoppingCart {
  id: number;
  title: string;
}

export default function GoodsContainer(props: GoodsProps) {
  const [filteredCollection, setFilteredConnection] = useState<Goods[]>([]);

  useEffect(() => {
    setFilteredConnection(props.goods);
  }, [props.goods]);

  function handleQueryChange(query: string) {
    if (!query) setFilteredConnection(props.goods);
    else
      setFilteredConnection(
        props.goods.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      );
  }

  return (
    <>
      <Typography component="h1" variant="h3" textAlign="center">
        Goods List (count of products in shopping cart:
        {" " + props.goods.filter((g) => g.isInShoppingCart).length})
      </Typography>
      <SearchBar target={props.goods} onQueryChange={handleQueryChange} />
      {filteredCollection.length > 0 ? (
        <GoodsList
          goods={filteredCollection}
          canCartAdd
          onShoppingCartAdd={props.onShoppingCartAdd}
        />
      ) : (
        <Typography component="h2" variant="h3" textAlign="center">
          Goods not found
        </Typography>
      )}
    </>
  );
}
