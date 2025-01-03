import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TableCategories from "../components/TableCategories";

export default function CategoriesData() {
  const [categorias, setCategorias] = useState([]);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/categorias",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCategorias(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid item xs={10} sx={{ height: "100%", width: "100%" }}>
        <Box>
          <Box marginTop={6}>
            <Typography variant="h6" component="h6" gutterBottom align="center">
              Historial de categorías
            </Typography>
          </Box>
        </Box>
        <Box>
            <TableCategories categorias={categorias} />
        </Box>
      </Grid>
    </Box>
  );
}
