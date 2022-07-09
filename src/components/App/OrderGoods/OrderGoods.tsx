import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../http/Api";
import GoodsList from "../GoodsPage/GoodsContainer/GoodsList/GoodsList";
import { Goods } from "../GoodsPage/GoodsPage";

export default function OrderGoods() {
  const [goods, setGoods] = useState<Goods[]>([]);
  const [cookies] = useCookies(["token"]);

  const { id } = useParams();

  useEffect(() => {
    const setGoodsToState = async () => {
      const response = await fetch(BASE_URL + "/api/orderProducts/" + id, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      });
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
