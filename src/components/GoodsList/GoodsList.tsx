import { Typography, Card, Box, Divider } from "@mui/material";
import React, { Fragment } from "react";
import { Goods } from "../../containers/GoodsPage/GoodsPage";

interface GoodsProps {
  goods: Goods[];
}

export default function GoodsList(props: GoodsProps) {
  function mapGoods() {
    return props.goods.map((product) => {
      return (
        <Card key={product.id} sx={{ margin: "1em" }} elevation={4}>
          <Box>
            <Typography component="h1" variant="h3" textAlign="center">
              Title: {product.title}
            </Typography>
            <Divider />
            <Typography component="h2" variant="h4" textAlign="center">
              Price: {Math.fround(product.priceInCents / 100)}$
            </Typography>
            <img
              src={product.imageUrl}
              alt={product.alt}
              width={100}
              height={100}
            />
          </Box>
        </Card>
      );
    });
  }

  if (props.goods.length > 0) {
    return <>{mapGoods()}</>;
  } else {
    return <Typography>Loading...</Typography>;
  }
}
