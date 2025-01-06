import { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TableProducts from "./../components/TableProducts";

export default function ProductsData() {
    const [productos, setProductos] = useState([]);

    const fetchProductos = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/productos",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setProductos(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProductos();
    }, []);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid item xs={10} sx={{ height: "100%", width: "100%" }}>
        <Box>
          <Box marginTop={6}>
            <Typography variant="h6" component="h6" gutterBottom align="center">
              Historial de productos
            </Typography>
          </Box>
        </Box>
        <Box>
          <TableProducts productos={productos} />
        </Box>
      </Grid>
    </Box>
  );
}
