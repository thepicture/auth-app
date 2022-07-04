import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import GoodsList from "../../components/GoodsList/GoodsList";

export interface Goods {
  id: number;
  title: string;
  priceInCents: number;
  imageUrl: string | undefined;
  alt: string | undefined;
}

export default function GoodsPage() {
  const [{ token }] = useCookies(["token"]);
  const [goods, setGoods] = useState<Goods[]>([]);

  useEffect(() => {
    setGoodsToState();
  }, []);

  const setGoodsToState = async () => {
    const response = await fetch("api/goods", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const goodsResponse: Goods[] = await response.json();
    setGoods(goodsResponse);
  };

  return (
    <>
      <GoodsList goods={goods} />
    </>
  );
}
