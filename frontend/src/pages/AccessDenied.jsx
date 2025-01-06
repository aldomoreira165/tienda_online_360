import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import useUser from "../hooks/useUser";

export default function AccessDenied() {
  const navigate = useNavigate();

  const { logout } = useUser();

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:3000/api/v1/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");

      setTimeout(() => {
        navigate("/");
        logout();
      }, 2000);
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <SentimentVeryDissatisfiedIcon
            sx={{ fontSize: 100, color: "error" }}
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <h1>Acceso Denegado</h1>
          <p>No tienes permisos para acceder a esta página.</p>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Ir a Inicio
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
