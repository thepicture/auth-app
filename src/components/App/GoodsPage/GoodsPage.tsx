import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import GoodsContainer from "./GoodsContainer/GoodsContainer";
import { Button, Card } from "@mui/material";
import { Link } from "react-router-dom";

export interface Goods {
  id: number;
  title: string;
  priceInCents: number;
  imageUrl: string | undefined;
  alt: string | undefined;
  isInShoppingCart: boolean;
}

export default function GoodsPage() {
  const [{ token }] = useCookies(["token"]);
  const [goods, setGoods] = useState<Goods[]>([]);

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
      const response = await fetch("/api/goods");
      const goodsResponse: Goods[] = await response.json();
      setGoods(goodsResponse);
    };

    setGoodsToState();
  }, [token]);

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
          justifyContent: "center",
        }}
      >
        <Link
          to="/order"
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
      </Card>
    </>
  );
}
