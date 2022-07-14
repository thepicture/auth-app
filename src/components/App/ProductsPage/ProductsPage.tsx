import { useEffect, useState } from "react";
import ProductsContainer from "./ProductsContainer/ProductsContainer";
import { Button, Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../http/api";

export interface Product {
  id: number;
  title: string;
  priceInCents: number;
  imageUrl: string | undefined;
  alt: string | undefined;
  isInShoppingCart: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  function handleShoppingCartAdd(id: number) {
    const newProducts = products.slice();

    newProducts.forEach((p) => {
      if (p.id === id) {
        p.isInShoppingCart = !p.isInShoppingCart;
      }
      return p;
    });

    setProducts(newProducts);
  }

  useEffect(() => {
    const setProductsToState = async () => {
      const response = await api.get("/api/products");
      const productsResponse: Product[] = response.data;
      setProducts(productsResponse);
    };

    setProductsToState();
  }, []);

  return (
    <>
      <ProductsContainer
        products={products}
        onShoppingCartAdd={handleShoppingCartAdd}
      />
      <Card
        elevation={5}
        sx={{
          position: "fixed",
          bottom: 0,
          left: "10px",
          right: "10px",
          padding: "2em",
          margin: "2em",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/makeOrder"
          state={{ products: products.filter((g) => g.isInShoppingCart) }}
          style={{ textDecoration: "none" }}
        >
          <Button
            disabled={!products.some((g) => g.isInShoppingCart)}
            variant="contained"
          >
            Order selected products
          </Button>
        </Link>
        <Button onClick={() => navigate("/home")}>To home page</Button>
      </Card>
    </>
  );
}
