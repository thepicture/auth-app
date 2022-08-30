import { useEffect, useState } from "react";

import { Box, Button, Card, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import api from "../../../http/api";
import Order from "../../../interfaces/Order";
import OrdersList from "./OrdersList/OrdersList";

import styles from "./OrdersPage.module.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/order").then((response) => {
      setOrders(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Typography component="h1" variant="h3" textAlign="center">
        My orders
      </Typography>
      <Box display="flex" justifyContent="center">
        <Button onClick={() => navigate("/home")}>Go back</Button>
      </Box>
      <Card className={styles.Card}>
        <Box display="flex" flexWrap="wrap">
          <OrdersList orders={orders} isLoading={isLoading} />
        </Box>
      </Card>
    </>
  );
}
