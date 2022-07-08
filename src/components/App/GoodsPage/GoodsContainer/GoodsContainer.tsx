import { Typography } from "@mui/material";
import { Goods } from "../GoodsPage";
import GoodsList from "./GoodsList/GoodsList";

interface GoodsProps {
  goods: Goods[];
  onShoppingCartAdd: (id: number) => void;
}

export interface ShoppingCart {
  id: number;
  title: string;
}

export default function GoodsContainer(props: GoodsProps) {
  if (props.goods.length > 0) {
    return (
      <>
        <Typography component="h1" variant="h3" textAlign="center">
          Goods List (count of products in shopping cart:
          {" " + props.goods.filter((g) => g.isInShoppingCart).length})
        </Typography>
        <GoodsList
          goods={props.goods}
          onShoppingCartAdd={props.onShoppingCartAdd}
        />
      </>
    );
  } else {
    return <Typography>Loading...</Typography>;
  }
}
