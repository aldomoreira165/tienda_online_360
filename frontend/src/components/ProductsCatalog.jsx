import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import ProductCard from "./CardProduct";

export default function ProductsCatalog() {
  const [products, setProducts] = useState([]);

  // obteniendo productos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/productos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const activeProducts = response.data.data.filter(product => product.Estados_idEstados === 1);
        setProducts(activeProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, marginTop: 15 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <ProductCard 
            key={product.idProductos}
            nombre={product.nombre}
            foto={product.foto}
            stock={product.stock}
           />
        ))}
      </Grid>
    </Box>
  );
}
