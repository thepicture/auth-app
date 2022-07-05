import { Card, Box, Typography, Divider, Button } from "@mui/material";
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
          <Card
            key={product.id}
            sx={{ margin: "1em auto", padding: "2em 0", width: "50%" }}
            elevation={4}
          >
            <Box display="flex" flexDirection="column">
              <Typography
                component="h1"
                variant="h4"
                textAlign="center"
                padding=".1em"
              >
                Title: {product.title}
              </Typography>
              <Divider />
              <Typography
                component="h2"
                variant="h5"
                textAlign="center"
                padding=".5em"
              >
                Price: {Math.fround(product.priceInCents / 100)}$
              </Typography>
              <img
                src={product.imageUrl}
                alt={product.alt}
                height={300}
                width="100%"
                style={{ objectFit: "cover", margin: "auto" }}
              />
              <Button
                onClick={() => props.onBasketAdd(product.id)}
                variant={product.isInBasket ? "outlined" : "contained"}
                sx={{
                  margin: "2em 2em 0 2em",
                  boxSizing: "border-box",
                }}
              >
                {product.isInBasket ? "Remove from basket" : "Add to basket"}
              </Button>
            </Box>
          </Card>
        );
      })}
    </>
  );
}
