import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Box from "@mui/material/Box";
import Typografy from "@mui/material/Typography";
import AlertMessage from "./../components/AlertMessage";
import TableHistoryClient from "./../components/TableHistoryClient";

export default function HistoryClient() {
  const [ordenes, setOrdenes] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);

  const fetchOrdenes = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const idUsuario = decodedToken.id;

      const response = await axios.get(
        `http://localhost:3000/api/v1/ordenes/usuario/${idUsuario}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setOrdenes(response.data.data);
    } catch (error) {
      console.error(error);
      setAlertSeverity("error");
      setAlertMessage("Error al obtener las órdenes de compra");
      setOpenAlert(true);
    }
  };

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const handleReject = async (idOrden) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/ordenes/cancelar/${idOrden}`,
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

      fetchOrdenes();
    } catch (error) {
      console.error("Error rechanzado orden:", error);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 15 }}>
      <Box>
        <Typografy variant="h6" component="h6" gutterBottom align="center">
          Historial de compras
        </Typografy>
        <Box marginTop={4} marginInline={10}>
          <TableHistoryClient ordenes={ordenes} onReject={handleReject} />
        </Box>
      </Box>
      <AlertMessage
        openAlert={openAlert}
        closeAlert={handleCloseAlert}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
      />
    </Box>
  );
}
