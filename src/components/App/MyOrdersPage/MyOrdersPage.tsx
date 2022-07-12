import { Box, Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../http/api";
import Order from "../../../interfaces/Order";
import OrdersList from "./OrdersList/OrdersList";

export default function MyOrdersPage() {
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
      <Card
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "3em",
        }}
      >
        <Box display="flex" flexWrap="wrap">
          <OrdersList orders={orders} isLoading={isLoading} />
        </Box>
      </Card>
    </>
  );
}
