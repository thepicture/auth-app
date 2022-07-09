import { Box, Button, Card, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Order from "../../../../interfaces/Order";

interface OrdersListProps {
  orders: Order[];
  isLoading: boolean;
}

export default function OrdersList({ orders, isLoading }: OrdersListProps) {
  if (orders.length === 0 && !isLoading) {
    return (
      <Typography component="h1" variant="h3" textAlign="center">
        You haven't ordered anything yet
      </Typography>
    );
  }

  return (
    <>
      <Typography component="h1" variant="h3" textAlign="center">
        My orders
      </Typography>
      {orders.map((order) => {
        return (
          <Card
            key={order.orderId}
            sx={{ margin: "1em auto", padding: "2em" }}
            elevation={4}
          >
            <Typography
              component="h1"
              variant="h5"
              textAlign="center"
              padding=".1em"
            >
              Date: {new Date(order.creationUnixTime).toLocaleString()}
            </Typography>
            <Box display="flex" flexDirection="column">
              <Typography
                component="h2"
                variant="h5"
                textAlign="center"
                padding=".1em"
              >
                Count of products: {order.countOfProducts}
              </Typography>
              <Divider />
              <Typography
                component="h3"
                variant="h6"
                fontWeight="bold"
                textAlign="center"
                padding=".5em"
              >
                Price: {Math.fround(order.sumInCents / 100)}$
              </Typography>
              <Link
                to={"/orderProducts/" + order.orderId}
                style={{ textDecoration: "none" }}
              >
                <Button
                  style={{
                    margin: "2em auto 0 auto",
                    width: "100%",
                  }}
                >
                  Products
                </Button>
              </Link>
            </Box>
          </Card>
        );
      })}
    </>
  );
}
