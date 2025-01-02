import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typografy from "@mui/material/Typography";
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
    <Box sx={{ flexGrow: 1, marginTop: 6 }}>
      <Box>
        <Typografy variant="h6" component="h6" gutterBottom align="center">
          Histórico de clientes
        </Typografy>
        <Box marginTop={4} marginInline={10}>
          <TableClients clientes={clientes} />
        </Box>
      </Box>
    </Box>
  );
}
