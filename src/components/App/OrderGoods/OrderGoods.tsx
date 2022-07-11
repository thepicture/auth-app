import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoodsList from "../GoodsPage/GoodsContainer/GoodsList/GoodsList";
import { Goods } from "../GoodsPage/GoodsPage";

export default function OrderGoods() {
  const [goods, setGoods] = useState<Goods[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const setGoodsToState = async () => {
      const response = await fetch("/api/orderProducts/" + id);
      const goodsResponse: Goods[] = await response.json();
      setGoods(goodsResponse);
    };

    setGoodsToState();
  }, []);

  return (
    <>
      <Typography component="h1" variant="h3" textAlign="center">
        Order goods
      </Typography>
      <GoodsList goods={goods} onShoppingCartAdd={() => {}} />
    </>
  );
}
