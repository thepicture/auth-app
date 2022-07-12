import { useEffect, useState } from "react";
import GoodsContainer from "./GoodsContainer/GoodsContainer";
import { Button, Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../http/api";

export interface Goods {
  id: number;
  title: string;
  priceInCents: number;
  imageUrl: string | undefined;
  alt: string | undefined;
  isInShoppingCart: boolean;
}

export default function GoodsPage() {
  const [goods, setGoods] = useState<Goods[]>([]);
  const navigate = useNavigate();

  function handleShoppingCartAdd(id: number) {
    const newGoods = goods.slice();

    newGoods.forEach((p) => {
      if (p.id === id) {
        p.isInShoppingCart = !p.isInShoppingCart;
      }
      return p;
    });

    setGoods(newGoods);
  }

  useEffect(() => {
    const setGoodsToState = async () => {
      const response = await api.get("/api/goods");
      const goodsResponse: Goods[] = response.data;
      setGoods(goodsResponse);
    };

    setGoodsToState();
  }, []);

  return (
    <>
      <GoodsContainer goods={goods} onShoppingCartAdd={handleShoppingCartAdd} />
      <Card
        elevation={5}
        sx={{
          position: "fixed",
          bottom: 0,
          left: "10px",
          right: "10px",
          padding: "2em",
          margin: "2em",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/makeOrder"
          state={{ goods: goods.filter((g) => g.isInShoppingCart) }}
          style={{ textDecoration: "none" }}
        >
          <Button
            disabled={!goods.some((g) => g.isInShoppingCart)}
            variant="contained"
          >
            Order selected products
          </Button>
        </Link>
        <Button onClick={() => navigate("/home")}>To home page</Button>
      </Card>
    </>
  );
}
