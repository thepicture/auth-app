import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../http/api";
import ProductsList from "../ProductsPage/ProductsContainer/ProductsList/ProductsList";
import { Product } from "../ProductsPage/ProductsPage";

export default function OrderPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const setProductsToState = async () => {
      const response = await api.get("/api/orderProducts/" + id);
      const productsResponse: Product[] = response.data;
      setProducts(productsResponse);
    };

    setProductsToState();
  }, []);

  return (
    <>
      <Typography component="h1" variant="h3" textAlign="center">
        Order products
      </Typography>
      <Box display="flex" justifyContent="center">
        <Button onClick={() => navigate("/orders")}>Go back</Button>
      </Box>
      <ProductsList products={products} onShoppingCartAdd={() => {}} />
    </>
  );
}
