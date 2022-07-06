import { Typography } from "@mui/material";
import { Goods } from "../../GoodsPage/GoodsPage";
import GoodsItems from "./GoodsItems/GoodsItems";

interface GoodsProps {
  goods: Goods[];
  onBasketAdd: (id: number) => void;
}

export interface Basket {
  id: number;
  title: string;
}

export default function GoodsList(props: GoodsProps) {
  if (props.goods.length > 0) {
    return (
      <>
        <Typography component="h1" variant="h3" textAlign="center">
          Goods List (count of products in basket:
          {" " + props.goods.filter((g) => g.isInBasket).length})
        </Typography>
        <GoodsItems goods={props.goods} onBasketAdd={props.onBasketAdd} />
      </>
    );
  } else {
    return <Typography>Loading...</Typography>;
  }
}
