import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "./../assets/images/tiendita_logo.jpg";
import AlertMessage from "./AlertMessage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const settings = ["Perfil", "Logout"];

function AppBarOperator() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);
  const [usuario, setUsuario] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const idUsuario = localStorage.getItem("idUsuario");

        const response = await axios.get(
          `http://localhost:3000/api/v1/usuarios/${idUsuario}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUsuario(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("rolUsuario");
    localStorage.removeItem("emailUsuario");
    setAlertSeverity("success");
    setAlertMessage("Cerrando sesión. Redirigiendo...");
    setOpenAlert(true);
    setTimeout(() => navigate("/"), 2000);
  };

  const handleMainClick = () => {
    navigate("/operator");
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img className="logo-nav" src={logo} alt="logo" onClick={handleMainClick}></img>
            </Box>
            <Box display={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" component="div" sx={{ padding: 1 }}>
                  {usuario.nombre}
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src="/broken-image.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={
                        setting === "Logout"
                          ? handleLogout
                          : handleCloseUserMenu
                      }
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          </Box>
        </Toolbar>
        <AlertMessage
          openAlert={openAlert}
          closeAlert={handleCloseAlert}
          alertSeverity={alertSeverity}
          alertMessage={alertMessage}
        />
      </Container>
    </AppBar>
  );
}
export default AppBarOperator;
