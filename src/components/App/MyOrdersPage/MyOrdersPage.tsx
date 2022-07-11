import { Box, Card } from "@mui/material";
import { useEffect, useState } from "react";
import Order from "../../../interfaces/Order";
import OrdersList from "./OrdersList/OrdersList";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/order")
      .then((response) => response.json())
      .then((json: Order[]) => {
        setOrders(json);
        setIsLoading(false);
      });
  }, []);

  return (
    <Card
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "3em",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <OrdersList orders={orders} isLoading={isLoading} />
      </Box>
    </Card>
  );
}
