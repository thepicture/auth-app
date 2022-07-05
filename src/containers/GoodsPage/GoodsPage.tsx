import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import GoodsList from "../../components/GoodsList/GoodsList";
import { BASE_URL } from "../../http/Api";

export interface Goods {
  id: number;
  title: string;
  priceInCents: number;
  imageUrl: string | undefined;
  alt: string | undefined;
  isInBasket: boolean;
}

export default function GoodsPage() {
  const [{ token }] = useCookies(["token"]);
  const [goods, setGoods] = useState<Goods[]>([]);

  function handleBasketAdd(id: number) {
    const newGoods = goods.slice();

    newGoods.forEach((p) => {
      if (p.id === id) {
        p.isInBasket = !p.isInBasket;
      }
      return p;
    });

    setGoods(newGoods);
  }

  useEffect(() => {
    setGoodsToState();
  }, []);

  const setGoodsToState = async () => {
    const response = await fetch(BASE_URL + "/api/goods", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const goodsResponse: Goods[] = await response.json();
    setGoods(goodsResponse);
  };

  return (
    <>
      <GoodsList goods={goods} onBasketAdd={handleBasketAdd} />
    </>
  );
}
