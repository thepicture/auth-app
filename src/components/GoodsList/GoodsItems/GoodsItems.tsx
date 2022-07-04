import { Card, Box, Typography, Divider, Button } from "@mui/material";
import React from "react";
import { Goods } from "../../../containers/GoodsPage/GoodsPage";

interface GoodsProps {
  goods: Goods[];
  onBasketAdd: (id: number) => void;
}

export default function GoodsItems(props: GoodsProps) {
  const { goods } = props;

  return (
    <>
      {goods.map((product) => {
        return (
          <Card key={product.id} sx={{ margin: "1em" }} elevation={4}>
            <Box display="flex" flexDirection="column">
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
              <Button
                onClick={() => props.onBasketAdd(product.id)}
                variant="contained"
                sx={{
                  margin: "auto",
                  display: product.isInBasket ? "none" : "inherit",
                }}
              >
                Add to basket
              </Button>
            </Box>
          </Card>
        );
      })}
    </>
  );
}
