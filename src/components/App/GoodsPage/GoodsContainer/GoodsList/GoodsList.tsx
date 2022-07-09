import { Card, Box, Typography, Divider, Button } from "@mui/material";
import { Goods } from "../../GoodsPage";

interface GoodsProps {
  goods: Goods[];
  onShoppingCartAdd: (id: number) => void;
  canCartAdd?: boolean;
}

export default function GoodsList(props: GoodsProps) {
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
              {props.canCartAdd && (
                <Button
                  onClick={() => props.onShoppingCartAdd(product.id)}
                  variant={product.isInShoppingCart ? "outlined" : "contained"}
                  sx={{
                    margin: "2em 2em 0 2em",
                    boxSizing: "border-box",
                  }}
                >
                  {product.isInShoppingCart
                    ? "Remove from shopping cart"
                    : "Add to shopping cart"}
                </Button>
              )}
            </Box>
          </Card>
        );
      })}
    </>
  );
}
