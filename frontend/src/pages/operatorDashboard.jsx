import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableHistoryOperator from "../components/TableHistoryOperator";

export default function OperatorDashboard() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/ordenes",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrdenes(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrdenes();
  }, []);

  return (
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center",}}>
      <Grid item xs={10} sx={{ height: "100%", width: "100%" }}>
        <Box>
          <Box marginTop={6}>
            <Typography variant="h6" component="h6" gutterBottom align="center">
              Historial de pedidos
            </Typography>
          </Box>
        </Box>
        <Box>
          <TableHistoryOperator ordenes={ordenes} />
        </Box>
      </Grid>
    </Box>
  );
}
