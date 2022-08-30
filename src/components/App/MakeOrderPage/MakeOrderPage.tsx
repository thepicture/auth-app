import { Card } from "@mui/material";

import OrderForm from "./OrderForm/OrderForm";

import styles from "./MakeOrderPage.module.css";

export default function MakeOrderPage() {
  return (
    <Card className={styles.Card}>
      <OrderForm />
    </Card>
  );
}
