import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableConfirmOrders from "./../components/TableConfirmOrders";

export default function ConfirmOrdersOperator() {
  const [ordenes, setOrdenes] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/ordenes/confirmadas",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrdenes(response.data.data);
    } catch (error) {
      console.error("Error obteniendo ordenes:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleApprove = async (idOrden) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/ordenes/entregar/${idOrden}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchOrders();
    } catch (error) {
      console.error("Error aprobando orden:", error);
    }
  };

  const handleReject = async (idOrden) => {
    console.log("Rechazando orden", idOrden);
    console.log(ordenes);
    try {
      await axios.put(
        `http://localhost:3000/api/v1/ordenes/rechazar/${idOrden}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // incrementar nuevamente el stock de cada producto
      const ordenRechazada = ordenes.find((orden) => orden.idOrden === idOrden);

      const detalleOrdenRechazada = ordenRechazada.detalles;

      detalleOrdenRechazada.forEach(async (detalle) => {
        const idProducto = detalle.Productos_idProductos;
        const cantidad = detalle.cantidad;

        await axios.put(
          `http://localhost:3000/api/v1/productos/incrementarStock/${idProducto}`,
          { cantidad },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      });

      fetchOrders();
    } catch (error) {
      console.error("Error rechanzado orden:", error);
    }
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid item xs={10} sx={{ height: "100%", width: "100%" }}>
        <Box>
          <Box marginTop={6}>
            <Typography variant="h6" component="h6" gutterBottom align="center">
              Confirmar pedidos
            </Typography>
          </Box>
        </Box>
        <Box>
          <TableConfirmOrders
            ordenes={ordenes}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </Box>
      </Grid>
    </Box>
  );
}
