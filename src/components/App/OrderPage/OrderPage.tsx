import { Card } from "@mui/material";
import React from "react";
import OrderForm from "./OrderForm/OrderForm";

export default function OrderPage() {
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
      <OrderForm />
    </Card>
  );
}
