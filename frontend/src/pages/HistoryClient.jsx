import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typografy from "@mui/material/Typography";
import AlertMessage from "./../components/AlertMessage";
import TableHistoryClient from "./../components/TableHistoryClient";

export default function HistoryClient() {
  const [ordenes, setOrdenes] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const idUsuario = localStorage.getItem("idUsuario");

        const response = await axios.get(
          `http://localhost:3000/api/v1/ordenes/usuario/${idUsuario}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setOrdenes(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
        setAlertSeverity("error");
        setAlertMessage("Error al obtener las órdenes de compra");
        setOpenAlert(true);
      }
    };

    fetchOrdenes();
  }, []);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 15 }}>
      <Box>
        <Typografy variant="h6" component="h6" gutterBottom align="center">
          Historial de compras
        </Typografy >
        <Box marginTop={4} marginInline={10}>
          <TableHistoryClient ordenes={ordenes} />
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
