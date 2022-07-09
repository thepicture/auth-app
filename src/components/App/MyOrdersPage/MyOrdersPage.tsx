import { Box, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BASE_URL } from "../../../http/Api";
import Order from "../../../interfaces/Order";
import OrdersList from "./OrdersList/OrdersList";

export default function MyOrdersPage() {
  const [cookies, _setCookie] = useCookies(["token"]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(BASE_URL + "/api/order", {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    })
      .then((response) => response.json())
      .then((json: Order[]) => {
        setOrders(json);
        setIsLoading(false);
      });
  }, [orders, isLoading]);

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
