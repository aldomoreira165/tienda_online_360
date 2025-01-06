import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TableClients from "./../components/TableClients";

export default function ClientsData() {
  const [clientes, setClientes] = useState([]);

  const fetchClientes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/clientes",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setClientes(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid item xs={10} sx={{ height: "100%", width: "100%" }}>
        <Box>
          <Box marginTop={6}>
            <Typography variant="h6" component="h6" gutterBottom align="center">
              Historial de clientes
            </Typography>
          </Box>
        </Box>
        <Box>
          <TableClients clientes={clientes} />
        </Box>
      </Grid>
    </Box>
  );
}
