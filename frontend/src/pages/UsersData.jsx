import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TableUsers from "./../components/TableUsers";

export default function UsersData() {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/usuarios",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUsuarios(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid item xs={10} sx={{ height: "100%", width: "100%" }}>
        <Box>
          <Box marginTop={6}>
            <Typography variant="h6" component="h6" gutterBottom align="center">
              Historial de usuarios
            </Typography>
          </Box>
        </Box>
        <Box>
            <TableUsers usuarios={usuarios} />
        </Box>
      </Grid>
    </Box>
  );
}
